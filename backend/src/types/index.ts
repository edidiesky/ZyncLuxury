import { IRoom } from "../models/Rooms";

export interface IRoomResult {
  data: IRoom[];
  success:boolean,
  message:string,
  pagination: {
    noOfPages: number;
    totalRooms: number;
    currentPage: number;
    limit: number;
  };
}
