import { Document, model, Schema, Types } from "mongoose";

export enum RoomType {
  VILLA = "VILLA",
  HOTEL = "HOTEL",
  APARTMENT = "APARTMENT",
  STAY = "STAY",
}

export enum ListingType {
  SALE = "SALE",
  RENT = "RENT",
  LEASE = "LEASE",
}

export interface IRoom {
  tenantId: string;
  title: string;
  description: string;
  price?: string;
  city?: string;
  country: string;
  state?: string;
  type: RoomType;
  listingType: ListingType;
  cautionfee?: string;
  guests?: number;
  latitude?: string;
  longitude?: string;
  bedroom: number;
  bathroom: number;
  images: string[];
  features?: any;
  amenities?: any;
  sellerId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RoomsSchema = new Schema<IRoom>(
  {
    tenantId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: String,
    city: String,
    country: { type: String, required: true },
    state: String,
    type: {
      type: String,
      enum: Object.values(RoomType),
      default: RoomType.STAY,
    },
    listingType: {
      type: String,
      enum: Object.values(ListingType),
      default: ListingType.RENT,
    },
    cautionfee: String,
    guests: Number,
    latitude: String,
    longitude: String,
    bedroom: { type: Number, required: true },
    bathroom: { type: Number, required: true },
    images: [String],
    features: Schema.Types.Mixed,
    amenities: Schema.Types.Mixed,
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

RoomsSchema.index({ tenantId: 1, createdAt: -1, sellerId: 1 });

export default model<IRoom>("Rooms", RoomsSchema);