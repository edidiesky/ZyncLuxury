import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  getAllRooms,
  getSellerRooms,
  createRoom,
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from "../services/room.service";
import { IRoom, RoomType } from "../models/Rooms";
import mongoose, { FilterQuery } from "mongoose";

// @description  Get all rooms
// @route  GET /room
// @access  Public
const GetAllRoom = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const {
      limit = 9,
      page = 1,
      maxPrice,
      startDate,
      endDate,
      minPrice,
      country,
      type,
      bedroom,
      bathroom,
      search,
    } = req.query;
    const roomstartDate = startDate ? new Date(startDate as string) : null;
    const roomendDate = endDate ? new Date(endDate as string) : null;

    const queryObject: FilterQuery<Partial<IRoom>> = {};
    if (type) {
      queryObject.type = {
        $in: Object.values(RoomType).includes(type as RoomType)
          ? type
          : undefined,
      };
    }
    if (bedroom) {
      queryObject.bedroom = bedroom;
    }
    if (bathroom) {
      queryObject.bathroom = bathroom;
    }
    if (country) {
      queryObject.country = country;
    }
    if (bedroom) {
      queryObject.bedroom = bedroom;
    }
    if (search) {
      queryObject.$or = [
        {
          title: { $regex: search, $options: "i" },
        },
      ];
    }
    if (startDate && endDate) {
      queryObject.$or = [
        {
          _id: {
            $nin: await mongoose
              .model("Reservations")
              .find({
                $or: [
                  { startDate: { $gte: roomstartDate, $lte: roomendDate } },
                  { endDate: { $gte: roomstartDate, $lte: roomendDate } },
                ],
              })
              .distinct("roomId"),
          },
        },
      ];
    }

    if (minPrice) {
      queryObject.price = {
        $gte: minPrice,
      };
    }

    if (maxPrice) {
      queryObject.price = {
        $lte: maxPrice,
      };
    }
    const result = await getAllRooms(req.query, Number(page), Number(limit));
    res.json(result);
  }
);

// @description  Get all rooms and reservations (placeholder)
// @route  GET /rooms/reservations
// @access  Public
const GetAllRoomAndReservations = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    //
    res.status(501).json({ message: "Not implemented" });
  }
);

// @description  Get a seller's rooms
// @route  GET /rooms/seller
// @access  Private
const GetAllSellerRooms = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { limit = 6, page = 1 } = req.query;
    const { userId } = req.user as { userId: string };
    const result = await getSellerRooms(userId, Number(page), Number(limit));
    res.json(result);
    return;
  }
);

// @description  Create a room for the seller
// @route  POST /room
// @access  Private
const CreateRooms = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const room = await createRoom(
      req.body as Partial<IRoom>,
      req.user?.userId as string
    );

    res.json(room);
  }
);

// @description  Get a single room
// @route  GET /room/:id
// @access  Public
const GetSingleRoom = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const room = await getSingleRoom(req.params.id);
    res.json(room);
  }
);

// @description  Update a room for the seller
// @route  PUT /room/:id
// @access  Private
const UpdateRoom = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const room = await updateRoom(req.params.id, req.body as Partial<IRoom>);
    res.json({ updateRoom: room });
  }
);

// @description  Delete a room for the seller
// @route  DELETE /room/:id
// @access  Private
const DeleteRoom = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await deleteRoom(req.params.id);
    res.json(result);
  }
);

export {
  GetAllRoom,
  GetAllRoomAndReservations,
  CreateRooms,
  GetSingleRoom,
  DeleteRoom,
  GetAllSellerRooms,
  UpdateRoom,
};
