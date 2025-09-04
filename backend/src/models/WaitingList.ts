import { Document, model, Schema, Types } from "mongoose";

interface IWaitingList extends Document {
  _id: string;
  tenantId: string;
  userId: string;
  eventId: string;
  queuePosition: Number;
  joinTime: Date;
  status: string;
  seatPreferences: string;
  bookingId: string;
  createdAt: Date;
  updatedAt: Date;
}
const WaitingListSchema = new Schema<IWaitingList>(
  {
    _id: String,
    tenantId: String,
    userId: String,
    eventId: String,
    queuePosition: Number,
    joinTime: Date,
    status: String,
    seatPreferences: String,
    bookingId: String,
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
);

export default model<IWaitingList>("WaitingList", WaitingListSchema);
