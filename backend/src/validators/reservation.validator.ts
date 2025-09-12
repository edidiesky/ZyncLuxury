import { ReservationStatus } from "../models/Reservation";
import Joi from "joi";

export const reservationSchema = Joi.object({
  idempotencyKey: Joi.string().trim().optional(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  totalPrice: Joi.number().required(),
  guests: Joi.number().required(),
  partPaymentPrice: Joi.number().optional(),
});
