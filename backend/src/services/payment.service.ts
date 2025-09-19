import { FilterQuery, Types } from "mongoose";
import Payments, { IPayment } from "../models/Payment";
import redisClient from "../config/redisClient";
import {
  ICreatePaymentService,
  IPaymentGateway,
  IPaymentResult,
} from "../types";
import { PaystackAdapter } from "../adapters/PaystackAdapter";
import { FlutterWaveAdapter } from "../adapters/FlutterWaveAdapter";
import { InterswitchAdapter } from "../adapters/InterswitchAdapter";
import { StripeAdapter } from "../adapters/StripeAdapter";

const createPaymentService = ({
  gateway,
  flutterWaveSecretKey,
  paystackSecretKey,
}: ICreatePaymentService) => {
  switch (gateway) {
    case "PAYPAL":
      return PaystackAdapter(paystackSecretKey);
    case "FLUTTERWAVE":
      return FlutterWaveAdapter(flutterWaveSecretKey);
    case "INTERSWITCH":
      return InterswitchAdapter(paystackSecretKey);
    case "STRIPE":
      return StripeAdapter(paystackSecretKey);
    default:
      throw new Error("The provided payment gateway is not supported.");
  }
};

// Get all Payments with pagination and caching
const getAllPayments = async (
  queryObject: FilterQuery<Partial<IPayment>>,
  page: number = 1,
  limit: number = 9
): Promise<IPaymentResult> => {
  const skip = (page - 1) * limit;
  const cacheKey = `payments:${queryObject.userId}:${JSON.stringify(
    queryObject
  )}`;
  // Check Redis cache
  const cachePayments = await redisClient.get(cacheKey);
  if (cachePayments) {
    return JSON.parse(cachePayments);
  }

  // Query Mongoose
  const payments = await Payments.find(queryObject)
    .populate("sellerId", "name email image")
    .populate("userId", "name email image")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();

  // Get total Payments and pages
  const totalPayments = await Payments.countDocuments(queryObject);
  const noOfPages = Math.ceil(totalPayments / limit);
  const result = {
    data: payments,
    success: true,
    message: "Payments has been fetched succesfully!",
    pagination: {
      noOfPages,
      totalPayments,
      currentPage: page,
      limit,
    },
  };

  // Cache result (30 minutes)
  await redisClient.set(cacheKey, JSON.stringify(result), "EX", 60 * 30);

  return result;
};

// Get all Payments for a seller
const getSellerPayments = async (
  sellerId: string,
  page: number = 1,
  limit: number = 6
) => {
  const skip = (page - 1) * limit;
  const queryObject = { sellerId: new Types.ObjectId(sellerId) };

  const totalPayments = await Payments.countDocuments(queryObject);
  const payments = await Payments.find(queryObject)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const noOfPages = Math.ceil(totalPayments / limit);
  return { payments, noOfPages, totalPayments };
};

// Create a Payment
const createPayment = async (
  PaymentData: Partial<IPayment>,
  sellerId: string
) => {
  const data = { ...PaymentData, sellerId: new Types.ObjectId(sellerId) };
  const Payment = await Payments.create(data);
  return Payment;
};

// Get a single Payment by ID
const getSinglePayment = async (id: string) => {
  const cacheKey = `Payment_${id}`;

  // Check Redis cache
  const cachePayment = await redisClient.get(cacheKey);
  if (cachePayment) {
    return JSON.parse(cachePayment);
  }
  // Query Mongoose
  const payment = await Payments.findById(id).populate(
    "sellerId",
    "name email"
  );
  if (!payment) {
    throw new Error("No payment found");
  }

  // Cache result
  await redisClient.set(cacheKey, JSON.stringify(payment), "EX", 5 * 60);
  return payment;
};

// Update a Payment
const updatePayment = async (id: string, data: Partial<IPayment>) => {
  const Payment = await Payments.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  );
  if (!Payment) {
    throw new Error("No Payment found");
  }
  return Payment;
};

// Delete a Payment
const deletePayment = async (id: string) => {
  const payment = await Payments.findById(id);
  if (!payment) {
    throw new Error("The Payment does not exist");
  }
  await Payments.findByIdAndDelete(id);
  return { message: "The Payment has been successfully deleted" };
};

export {
  getAllPayments,
  getSellerPayments,
  getSinglePayment,
  updatePayment,
  deletePayment,
  createPaymentService,
};
