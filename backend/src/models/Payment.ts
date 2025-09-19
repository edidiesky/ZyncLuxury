import { Document, model, Schema, Types } from "mongoose";

export enum PaymentStatus {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  CONFIRMED = "CONFIRMED",
  UNAVAILABLE = "UNAVAILABLE",
  PARTPAYMENT = "PARTPAYMENT",
}

// CONTAINS LOCAL AND GLOVAL PAYMENT GATEWAY
export enum PaymentChannel {
  PAYSTACK = "PAYSTACK",
  FLUTTERWAVE = "FLUTTERWAVE",
  INTERSWITCH = "INTERSWITCH",
  ETRANZACT = "ETRANZACT",
  STRIPE = "STRIPE",
  PAYPAL = "PAYPAL",
}

export enum CurrencyType {
  NGN = "NGN",
  USD = "USD",
  BPD = "BPD",
}

export enum MethodType {
  ONLINE = "ONLINE",
  OFFLINE = "BANK",
}

export interface IPayment extends Document {
  amount?: number;
  guests?: number;
  status: PaymentStatus;
  userId: Types.ObjectId;
  sellerId: Types.ObjectId;
  reservationId: Types.ObjectId; //roomId
  roomId: Types.ObjectId; //roomId
  createdAt: Date;
  updatedAt: Date;
  paymentChannel: PaymentChannel;
  paymentMethod: MethodType;
  currency: CurrencyType;
  transactionId: string;
  finishedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    amount: Number,
    transactionId: String,
    currency: {
      type: String,
      required: true,
      enum: Object.values(CurrencyType),
    },
    guests: Number,
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
    paymentChannel: {
      type: String,
      enum: Object.values(PaymentChannel),
      default: PaymentChannel.PAYSTACK,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(MethodType),
      default: MethodType.ONLINE,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reservationId: {
      type: Schema.Types.ObjectId,
      ref: "Reservations",
      required: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Rooms",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

PaymentSchema.index({
  tenantId: 1,
  reservationId: 1,
  transactionId: 1,
  sellerId: 1,
  paymentChannel: 1,
});

export default model<IPayment>("Payment", PaymentSchema);
