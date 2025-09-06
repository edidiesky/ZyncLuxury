import { RoomMock } from "@/data/roomdata";
import { IRoom } from "../models/Rooms";
import { Types } from "mongoose";

export interface IRoomResult {
  data: RoomMock[];
  success:boolean,
  message:string,
  pagination: {
    noOfPages: number;
    totalRooms: number;
    currentPage: number;
    limit: number;
  };
}


export interface IToken {
  role: string;
  name: string;
  userId: Types.ObjectId;
}