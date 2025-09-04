import { Document, model, Schema, Types } from "mongoose";

interface IMessage extends Document {
  body?: string;
  image?: string;
  seenIds: Types.ObjectId[];
  conversationId?: Types.ObjectId;
  senderId: Types.ObjectId;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    body: String,
    image: String,
    seenIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversations" },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model<IMessage>("Message", MessageSchema);
