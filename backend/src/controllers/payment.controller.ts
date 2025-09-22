import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  getAllPayments,
  getSellerPayments,
  getSinglePayment,
  updatePayment,
  deletePayment,
  createPaymentService,
} from "../services/payment.service";
import Payment, { IPayment, PaymentStatus } from "../models/Payment";
import mongoose, { FilterQuery } from "mongoose";
import {
  SERVER_ERROR_STATUS_CODE,
  SUCCESSFULLY_CREATED_STATUS_CODE,
  SUCCESSFULLY_FETCHED_STATUS_CODE,
} from "../constant";
import logger from "../utils/logger";
import redisClient from "../config/redisClient";
const { v4 } = require("uuid");


// @description  Create a Payment for the seller
// @route  POST /Payment
// @access  Private
const CreatePayment = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.user as { userId: string };
    const webOrigin = process.env.WEB_ORIGIN2 || process.env.WEB_ORIGIN;
    const callbackUrl = `${webOrigin}/order/success`;
    const {
      idempotencyKey,
      email,
      phone,
      gateway,
      paymentMethod,

      amount,
      name,
      currency,
      ...otherReqBody
    } = req.body;
    // Creatiing BASE transaction's ACID gurantees for adding payment
    // My intent is to be prevent half completed payment
    const session = await mongoose.startSession();
    session.startTransaction();
    let payment;
    let transactionId;
    let redirectUrl;
    try {
      // implementing deduplication
      const lockedKey = `payment:lock:${idempotencyKey || v4()}`;
      // Using Redis atomic setnx to acheieve idempotency
      const isLockedKey = await redisClient.setnx(lockedKey, "LOCKED");
      if (!isLockedKey) {
        throw new Error(
          "Payment creation is in progress. You can try again after this process has been completed!"
        );
      }

      await redisClient.expire(lockedKey, 30 * 4);
      // checking if no keys has been provided
      if (!process.env.PAYSTACK_SECRET_KEY || !process.env.FLW_SECRET_KEY) {
        throw new Error(
          "Payment gateways secret key for PAYSTACK, STRIPE, Flutterwave is needed fro creating a Payment record!"
        );
      }

      const paymentProcessor = createPaymentService({
        gateway,
        flutterWaveSecretKey: process.env.PAYSTACK_SECRET_KEY,
        paystackSecretKey: process.env.FLW_SECRET_KEY,
      });

      const processingResult = await paymentProcessor.processOnlineTransaction({
        email,
        phone,
        amount: Number(amount),
        name,
        callback_url: callbackUrl,
        currency,
      });

      if (!processingResult.success) {
        throw new Error(
          processingResult.message ||
            "Please reach out to the support team. An unknown server did occurred"
        );
      }

      logger.info("Payment gateway response:", {
        processingResult,
      });

      const paymentRequestObj = {
        userId,
        paymentChannel: gateway,
        paymentMethod,
        status: PaymentStatus.PENDING,
        transactionId: processingResult.transactionId,
        ...otherReqBody,
      };

      const [createdPayment] = await Payment.create([paymentRequestObj], {
        session,
      });
      logger.info("Payment has been created succesfully:", {
        createdPayment: createdPayment ? "exists" : "notexists",
      });
      await session.commitTransaction();
      const redisPaymentKeyPattern = `payments:${userId}:*`;
      const roomRedisKeys = await redisClient.keys(redisPaymentKeyPattern);
      if (roomRedisKeys.length > 0) {
        await redisClient.del(roomRedisKeys);
        logger.info("Payment cache has been invalidated:", {
          roomRedisKeys,
          redisPaymentKeyPattern,
        });
      }
      res.status(SUCCESSFULLY_CREATED_STATUS_CODE).json({
        message:
          "Payment has been succesfully created. You will be redirected to the right platform for payment",
        success: true,
        data: {
          redirectUrl: processingResult.redirectUrl,
          payment: createdPayment,
        },
      });
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      logger.error("Error creating Payment has occurred:", {
        message:
          error instanceof Error
            ? error?.message
            : "An unknown server error occurred when creating your payment",
      });
      res.status(SERVER_ERROR_STATUS_CODE).json({
        success: false,
        data: null,
        message:
          error instanceof Error
            ? error?.message
            : "An unknown server error occurred when creating your payment",
      });
    } finally {
      // ending the session
      await session.endSession();
    }
  }
);

// @description  Get all Payments
// @route  GET /Payment
// @access  Public
const GetAllPayment = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const {
      limit = 9,
      page = 1,
      maxPrice,
      startDate,
      endDate,
      minPrice,
      status,
      paymentMethod,
      paymentChannel,
      search,
      sellerId,
      currency,
    } = req.query;
    const paymentstartDate = startDate ? new Date(startDate as string) : null;
    const paymentendDate = endDate ? new Date(endDate as string) : null;

    const queryObject: FilterQuery<Partial<IPayment>> = {};
    if (paymentMethod) {
      queryObject.paymentMethod = paymentMethod;
    }
    if (sellerId) {
      queryObject.sellerId = sellerId;
    }
    if (currency) {
      queryObject.currency = currency;
    }
    if (paymentChannel) {
      queryObject.paymentChannel = paymentChannel;
    }
    if (status) {
      queryObject.status = status;
    }
    if (search) {
      queryObject.$or = [
        {
          title: { $regex: search, $options: "i" },
        },
      ];
    }
    if (startDate && endDate) {
      queryObject.$or = [
        {
          _id: {
            $nin: await mongoose
              .model("Reservations")
              .find({
                $or: [
                  {
                    startDate: { $gte: paymentstartDate, $lte: paymentendDate },
                  },
                  { endDate: { $gte: paymentstartDate, $lte: paymentendDate } },
                ],
              })
              .distinct("PaymentId"),
          },
        },
      ];
    }
    if (minPrice) {
      queryObject.amount = {
        $gte: minPrice,
      };
    }
    if (maxPrice) {
      queryObject.amount = {
        $lte: maxPrice,
      };
    }

    logger.info("queryObject:", {
      queryObject,
    });
    const result = await getAllPayments(
      queryObject,
      Number(page),
      Number(limit)
    );
    res.status(SUCCESSFULLY_FETCHED_STATUS_CODE).json(result);
  }
);

// @description  Get a seller's Payments
// @route  GET /Payments/seller
// @access  Private
const GetAllSellerPayments = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { limit = 6, page = 1 } = req.query;
    const { userId } = req.user as { userId: string };
    const result = await getSellerPayments(userId, Number(page), Number(limit));
    res.status(SUCCESSFULLY_FETCHED_STATUS_CODE).json(result);
    return;
  }
);

// @description  Get a single Payment
// @route  GET /Payment/:id
// @access  Public
const GetSinglePayment = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const payment = await getSinglePayment(req.params.id);
    res.status(SUCCESSFULLY_FETCHED_STATUS_CODE).json({
      success: true,
      messsage: "Single Payment has been fetched succesfully",
      data: payment,
    });
  }
);

// @description  Update a Payment for the seller
// @route  PUT /Payment/:id
// @access  Private
const UpdatePayment = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const payment = await updatePayment(
      req.params.id,
      req.body as Partial<IPayment>
    );
    res.status(SUCCESSFULLY_FETCHED_STATUS_CODE).json({
      success: true,
      messsage: "Single Payment has been updated succesfully",
      data: payment,
    });
  }
);

// @description  Delete a Payment for the seller
// @route  DELETE /Payment/:id
// @access  Private
const DeletePayment = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await deletePayment(req.params.id);
    res.status(SUCCESSFULLY_FETCHED_STATUS_CODE).json({
      message: "Payment has been succesfully deleted",
      data: null,
      success: true,
    });
  }
);

export {
  GetAllPayment,
  CreatePayment,
  GetSinglePayment,
  DeletePayment,
  GetAllSellerPayments,
  UpdatePayment,
};
