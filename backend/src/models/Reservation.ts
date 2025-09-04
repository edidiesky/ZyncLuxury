import mongoose, { Document, model, Schema, Types } from "mongoose";
export enum ReservationStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  UNAVAILABLE = "UNAVAILABLE",
  PARTPAYMENT = "PARTPAYMENT",
}

export interface IReservation extends Document {
  tenantId: string;
  startDate: Date;
  endDate: Date;
  totalPrice?: number;
  guests?: number;
  patchGuests?: any;
  partPaymentPrice?: number;
  status: ReservationStatus;
  roomId: Types.ObjectId;
  userId: Types.ObjectId;
  sellerId?: Types.ObjectId;
  bookingId: string;
  queuePosition?: number;
  joinTime?: Date;
  paymentExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ReservationsSchema = new Schema<IReservation>(
  {
    tenantId: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: Number,
    guests: Number,
    patchGuests: Schema.Types.Mixed,
    partPaymentPrice: Number,
    status: {
      type: String,
      enum: Object.values(ReservationStatus),
      default: ReservationStatus.PENDING,
    },
    roomId: { type: Schema.Types.ObjectId, ref: "Rooms", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: "User" },
    bookingId: { type: String, unique: true },
    queuePosition: Number,
    joinTime: Date,
    paymentExpiresAt: Date,
  },
  {
    timestamps: true,
  }
);

ReservationsSchema.index({
  tenantId: 1,
  roomId: 1,
  status: 1,
  createdAt: 1,
  userId: 1,
});
ReservationsSchema.index({ status: 1, userId: 1 });

export default model<IReservation>("Reservations", ReservationsSchema);
