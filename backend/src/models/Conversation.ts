import { Document, model, Schema, Types } from "mongoose";

interface IConversation extends Document {
  lastMessageAt: Date;
  lastMessage?: string;
  isGroup?: boolean;
  userIds: Types.ObjectId[];
  messageIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ConversationsSchema = new Schema<IConversation>(
  {
    lastMessageAt: { type: Date, default: Date.now },
    lastMessage: String,
    isGroup: Boolean,
    userIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messageIds: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  },
  { timestamps: true }
);

export default model<IConversation>('Conversations', ConversationsSchema)