import mongoose, { Document, Schema, Types } from "mongoose";

enum RoleStatus {
  ADMIN = "ADMIN",
  USER = "USER",
  SELLER = "SELLER",
}

interface IPermissions {
  platform: string[];
  stores: string[];
  users: string[];
}

interface IUser extends Document {
  name: string;
  username: string;
  location?: string;
  about?: string;
  phone?: string;
  favourites: string[];
  experience?: number;
  email?: string;
  emailVerified?: boolean;
  image?: string;
  role: RoleStatus;
  hashedPassword?: string;
  createdAt: Date;
  updatedAt: Date;
  conversationIds: Types.ObjectId[];
  seenMessageIds: Types.ObjectId[];
  ratings?: number;
  tenantId?: string;
  permissions: IPermissions;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    location: String,
    about: String,
    phone: String,
    favourites: [String],
    experience: Number,
    email: { type: String, unique: true, sparse: true },
    emailVerified: {
      type: Boolean,
    },
    image: String,
    role: {
      type: String,
      enum: Object.values(RoleStatus),
      default: RoleStatus.SELLER,
    },
    hashedPassword: String,
    conversationIds: [{ type: Schema.Types.ObjectId, ref: "Conversation" }],
    seenMessageIds: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    ratings: Number,
    tenantId: String,
    permissions: {
      platform: [String],
      stores: [String],
      users: [String],
    },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1, createdAt:1 });

export default mongoose.model<IUser>("User", UserSchema);
