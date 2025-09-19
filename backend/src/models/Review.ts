import { Document, model, Schema, Types } from "mongoose";

export interface IReview extends Document {
  review: number;
  description: string;
  roomId: Types.ObjectId;
  userId: Types.ObjectId;
  sellerId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    review: { type: Number, required: true },
    description: { type: String, required: true },
    roomId: { type: Schema.Types.ObjectId, ref: "Rooms", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

ReviewSchema.index({ createdAt: -1, userId: 1, sellerId: 1 });
export default model<IReview>("Review", ReviewSchema);
