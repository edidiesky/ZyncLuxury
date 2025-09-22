import { Types } from "mongoose";
import {
  CurrencyType,
  MethodType,
  PaymentChannel,
  PaymentStatus,
} from "../models/Payment";

export interface RoomMock {
  _id?: Types.ObjectId;
  sellerId: Types.ObjectId;
  bedroom: number;
  bathroom: number;
  images: string[];
  title: string;
  description: string;
  price?: string;
  cautionfee?: string;
  guests?: number;
  latitude?: string;
  longitude?: string;
  country: string;
  city?: string;
  createdAt: Date;
  updatedAt: Date;
  state?: string;
  type: string;
  listingType: string;
  features?: any;
  amenities?: any;
}
export interface PaymentMock {
  amount?: number;
  guests?: number;
  status: PaymentStatus;
  userId: Types.ObjectId;
  sellerId: Types.ObjectId;
  reservationId: Types.ObjectId;
  cartItems?: any;
  createdAt: Date;
  updatedAt: Date;
  paymentChannel: PaymentChannel;
  paymentMethod: MethodType;
  currency: CurrencyType;
  transactionId: string;
  finishedAt: Date;
}

export interface IRoomResult {
  data: RoomMock[];
  success: boolean;
  message: string;
  pagination: {
    noOfPages: number;
    totalRooms: number;
    currentPage: number;
    limit: number;
  };
}

export interface ICreatePaymentService {
  gateway: IPaymentGateway;
  paystackSecretKey: string;
  flutterWaveSecretKey: string;
}

export type IPaymentGateway =
  | "PAYSTACK"
  | "FLUTTERWAVE"
  | "INTERSWITCH"
  | "STRIPE"
  | "PAYPAL";

export type AdapterProcesserType = {
  processOnlineTransaction: ({
    email,
    amount,
    name,
  }: IProcessOnlineTransaction) => Promise<PaymentAdapterResultType>;
  processTransferTransaction: () => Promise<void>;
  processRefundTransaction: () => Promise<void>;
};
export type PaymentAdapterResultType = {
  message: string;
  transactionId: string;
  redirectUrl: string;
  success: boolean;
};

export type IProcessOnlineTransaction = {
  email: string;
  amount: number;
  name: string;
  callback_url:string;
  phone:string;
  currency:string;
};
export interface IPaymentResult {
  data: PaymentMock[];
  success: boolean;
  message: string;
  pagination: {
    noOfPages: number;
    totalPayments: number;
    currentPage: number;
    limit: number;
  };
}

export interface IToken {
  role: string;
  name: string;
  userId: Types.ObjectId;
}

export interface IAggregatedRoom {
  queryObject: {
    sellerId:string
  };
}
