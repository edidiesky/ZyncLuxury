import logger from "../utils/logger";
import crypto from "crypto";
import redisClient from "../config/redisClient";
import {
  BAD_REQUEST_STATUS_CODE,
  SUCCESSFULLY_ACCEPTED_STATUS_CODE,
  SERVER_ERROR_STATUS_CODE,
} from "../constant";
import Payment, { PaymentStatus } from "../models/Payment";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Verify Paystack Webhook
const verifyPaystackWebhook = (body: any, signature: string): boolean => {
  const secretKey = process.env.PAYSTACK_SECRET_KEY || "";
  if (!secretKey) {
    logger.error("Missing PAYSTACK_SECRET_KEY environment variable");
    throw new Error("Paystack secret key is required");
  }
  return (
    crypto
      .createHmac("sha512", secretKey)
      .update(JSON.stringify(body))
      .digest("hex") === signature
  );
};

// Verify Flutterwave Webhook
const verifyFlutterwaveWebhook = (body: any, signature: string): boolean => {
  const secretKey = process.env.FLW_SECRET_KEY || "";
  if (!secretKey) {
    logger.error("Missing FLW_SECRET_KEY environment variable");
    throw new Error("Flutterwave secret key is required");
  }
  return (
    crypto
      .createHmac("sha512", secretKey)
      .update(JSON.stringify(body))
      .digest("hex") === signature
  );
};

// Verify ETranzact Webhook
const verifyETranzactWebhook = (body: any, signature: string): boolean => {
  const secretKey = process.env.CREDO_SECRET_KEY || "";
  if (!secretKey) {
    logger.error("Missing CREDO_SECRET_KEY environment variable");
    throw new Error("ETranzact secret key is required");
  }
  const data = body.data || {};
  const businessCode = data.businessCode || "";
  return (
    crypto
      .createHash("sha512")
      .update(`${secretKey}${businessCode}`)
      .digest("hex") === signature
  );
};

// Verify Interswitch Webhook
const verifyInterswitchWebhook = (body: any, signature: string): boolean => {
  const secretKey = process.env.INTERSWITCH_NOTIFICATION_SECRET_KEY || "";
  if (!secretKey) {
    logger.error("Missing INTERSWITCH_NOTIFICATION_SECRET_KEY environment variable");
    throw new Error("Interswitch secret key is required");
  }
  try {
    const hash = crypto
      .createHmac("sha512", secretKey)
      .update(JSON.stringify(body))
      .digest("hex");
    logger.info("Generated Interswitch hash", {
      generatedHash: hash,
      receivedSignature: signature,
    });
    return hash === signature;
  } catch (error: any) {
    logger.error("Interswitch webhook verification failed", {
      error: error.message,
    });
    return false;
  }
};

export const WebhookHandler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const { body, headers } = req;
    const { data, event } = body;
    let lockKey = "";
    let paymentChannel: string | null = null;
    let signature: string | undefined;

    try {
      // Determine payment channel and extract signature
      if (headers["x-paystack-signature"]) {
        signature = Array.isArray(headers["x-paystack-signature"])
          ? headers["x-paystack-signature"][0]
          : headers["x-paystack-signature"];
        paymentChannel = "PAYSTACK";
      } else if (headers["verif-hash"]) {
        signature = Array.isArray(headers["verif-hash"])
          ? headers["verif-hash"][0]
          : headers["verif-hash"];
        paymentChannel = "FLUTTERWAVE";
      } else if (headers["x-credo-signature"]) {
        signature = Array.isArray(headers["x-credo-signature"])
          ? headers["x-credo-signature"][0]
          : headers["x-credo-signature"];
        paymentChannel = "ETRANZACT";
      } else if (headers["x-interswitch-signature"]) {
        signature = String(headers["x-interswitch-signature"]);
        paymentChannel = "INTERSWITCH";
      } else {
        logger.error("Missing webhook signature", { headers });
        throw new Error("Missing signature in webhook headers");
      }

      if (!signature) {
        logger.error("Signature not found in expected header", {
          paymentChannel,
          headers,
        });
        throw new Error("Signature not found in expected header");
      }

      // Verify webhook signature
      const isValid =
        paymentChannel === "PAYSTACK"
          ? verifyPaystackWebhook(body, signature)
          : paymentChannel === "FLUTTERWAVE"
          ? verifyFlutterwaveWebhook(body, signature)
          : paymentChannel === "ETRANZACT"
          ? verifyETranzactWebhook(body, signature)
          : paymentChannel === "INTERSWITCH"
          ? verifyInterswitchWebhook(body, signature)
          : false;

      if (!isValid) {
        logger.error("Invalid webhook signature", {
          signature,
          paymentChannel,
        });
        throw new Error("Invalid webhook signature");
      }

      // Extract transaction details
      let transactionId: string;
      let status: string;
      let webhookAmount: number;

      if (paymentChannel === "PAYSTACK") {
        transactionId = data.reference || data.tx_ref;
        status = data.status;
        webhookAmount = parseFloat(data.amount || "0") / 100; // Paystack amounts are in kobo
      } else if (paymentChannel === "FLUTTERWAVE") {
        transactionId = data.tx_ref || data.transaction_id;
        status = data.status;
        webhookAmount = parseFloat(data.amount || "0");
      } else if (paymentChannel === "ETRANZACT") {
        transactionId = data.businessRef || data.transaction_id;
        status = data.status;
        webhookAmount = parseFloat(data.amount || "0");
      } else if (paymentChannel === "INTERSWITCH") {
        transactionId = data.merchantReference || data.transaction_id;
        status = data.responseCode === "00" ? "successful" : data.responseCode;
        webhookAmount = parseFloat(data.amount || "0");
      } else {
        throw new Error("Unsupported payment channel");
      }

      if (!transactionId) {
        logger.error("Missing transaction ID", { paymentChannel, data });
        throw new Error("Transaction ID not found in webhook payload");
      }

      // Acquire Redis lock to prevent duplicate processing
      lockKey = `payment:lock:${transactionId}`;
      const lockAcquired = await redisClient.setnx(lockKey, "LOCKED");
      if (!lockAcquired) {
        logger.warn("Webhook processing already in progress", { transactionId });
        throw new Error("Payment is already being processed");
      }
      await redisClient.expire(lockKey, 30); // Set lock expiration to 30 seconds

      // Find and validate payment
      const payment = await Payment.findOne({ transactionId }).session(session);
      if (!payment) {
        logger.error("Payment not found", { transactionId });
        throw new Error("Payment record not found");
      }

      // Validate amount
      if (webhookAmount !== payment.amount) {
        logger.warn("Amount mismatch in webhook", {
          transactionId,
          webhookAmount,
          dbAmount: payment.amount,
        });
        throw new Error("Webhook amount does not match payment record");
      }

      // Process based on event and status
      let newStatus: PaymentStatus | undefined;
      if (
        (paymentChannel === "PAYSTACK" && event === "charge.success") ||
        (paymentChannel === "FLUTTERWAVE" &&
          event === "charge.completed" &&
          status === "successful") ||
        (paymentChannel === "ETRANZACT" && event === "TRANSACTION.SUCCESSFUL") ||
        (paymentChannel === "INTERSWITCH" &&
          event === "TRANSACTION.COMPLETED" &&
          status === "00")
      ) {
        newStatus = PaymentStatus.CONFIRMED;
      } else if (
        (paymentChannel === "PAYSTACK" &&
          (event === "charge.failed" || event === "transfer.failed")) ||
        (paymentChannel === "FLUTTERWAVE" &&
          (status === "failed" || status === "cancelled")) ||
        (paymentChannel === "ETRANZACT" && event === "transaction.failed") ||
        (paymentChannel === "INTERSWITCH" && event === "paymentrequest.cancelled")
      ) {
        newStatus = PaymentStatus.CANCELLED;
      } else {
        logger.warn("Unhandled webhook event or status", {
          paymentChannel,
          event,
          status,
        });
        throw new Error("Unhandled webhook event or status");
      }

      // Update payment status
      if (newStatus && payment.status !== newStatus) {
        payment.status = newStatus;
        payment.finishedAt = new Date();
        await payment.save({ session });

        // Invalidate cache
        const redisPaymentKeyPattern = `payments:${payment.userId}:*`;
        const redisKeys = await redisClient.keys(redisPaymentKeyPattern);
        if (redisKeys.length > 0) {
          await redisClient.del(redisKeys);
          logger.info("Payment cache invalidated", { redisPaymentKeyPattern });
        }
      }

      // Commit transaction
      await session.commitTransaction();
      res.status(SUCCESSFULLY_ACCEPTED_STATUS_CODE).json({
        status: "success",
        data: null,
        message: "Webhook notification processed successfully",
      });
    } catch (error) {
      logger.error("Webhook processing failed", {
        error: error instanceof Error ? error.message : "Unknown error",
        paymentChannel,
        event,
        data,
      });

      if (session.inTransaction()) {
        await session.abortTransaction();
      }

      res.status(BAD_REQUEST_STATUS_CODE).json({
        data: null,
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "An error occurred while processing the webhook. Please contact support.",
      });
    } finally {
      if (lockKey) {
        await redisClient.del(lockKey);
      }
      await session.endSession();
    }
  }
);