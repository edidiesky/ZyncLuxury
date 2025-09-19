import {
  CurrencyType,
  MethodType,
  PaymentChannel,
  PaymentStatus,
} from "../models/Payment";
import Joi from "joi";

export const paymentSchema = Joi.object({
  idempotencyKey: Joi.string().trim().optional(),
  userId: Joi.string().trim().required(),
  sellerId: Joi.string().trim().required(), //name
  name: Joi.string().trim().required(), //currency
  email: Joi.string().trim().required(),
  phone: Joi.string().trim().required(),
  reservationId: Joi.string().trim().required(),
  roomId: Joi.string().trim().required(),
  paymentMethod: Joi.string()
    .trim()
    .valid(...Object.values(MethodType))
    .required(),
  partPaymentPercentage: Joi.number().optional(),
  installmentNumber: Joi.number().optional(),
  amount: Joi.number().optional(),
  paymentChannel: Joi.string()
    .valid(...Object.values(PaymentChannel))
    .required(),
  status: Joi.string()
    .valid(...Object.values(PaymentStatus))
    .required(),
  currency: Joi.string()
    .valid(...Object.values(CurrencyType))
    .required(),
});
