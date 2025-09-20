import mongoose, { FilterQuery, Types } from "mongoose";
import Rooms, { IRoom, RoomType } from "../models/Rooms";
import redisClient from "../config/redisClient";
import { IRoomResult } from "../types";
import logger from "../utils/logger";

// Get all rooms with pagination and caching
const getAllRooms = async (
  queryObject: FilterQuery<Partial<IRoom>>,
  page: number = 1,
  limit: number = 9
): Promise<IRoomResult> => {
  const skip = (page - 1) * limit;
  const cacheKey = `rooms:${queryObject.sellerId}:${JSON.stringify(queryObject)}`;

  // Check Redis cache
  const cacheRooms = await redisClient.get(cacheKey);
  if (cacheRooms) {
    return JSON.parse(cacheRooms);
  }

  // Querying Mongoose
  const rooms = await Rooms.find(queryObject)
    .populate("sellerId", "name email")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();

  // Get total rooms and pages
  const totalRooms = await Rooms.countDocuments(queryObject);
  const noOfPages = Math.ceil(totalRooms / limit);
  const result = {
    data: rooms,
    success: true,
    message: "Rooms has been fetched succesfully!",
    pagination: {
      noOfPages,
      totalRooms,
      currentPage: page,
      limit,
    },
  };

  // Caching result (30 minutes)
  await redisClient.set(cacheKey, JSON.stringify(result), "EX", 60 * 30);

  return result;
};

// Get all rooms for a seller
const getSellerRooms = async (
  sellerId: string,
  page: number = 1,
  limit: number = 6
) => {
  const skip = (page - 1) * limit;
  const queryObject = { sellerId: new Types.ObjectId(sellerId) };

  const totalRooms = await Rooms.countDocuments(queryObject);
  const rooms = await Rooms.find(queryObject)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const noOfPages = Math.ceil(totalRooms / limit);
  return { rooms, noOfPages, totalRooms };
};

// Create a room
const createRoom = async (roomData: Partial<IRoom>, sellerId: string) => {
  const data = { ...roomData, sellerId: new Types.ObjectId(sellerId) };
  const room = await Rooms.create(data);
  const redisRoomsKeyPattern = `rooms:${sellerId}:*`;
  const roomRedisKeys = await redisClient.keys(redisRoomsKeyPattern);
  if (roomRedisKeys.length > 0) {
    await redisClient.del(roomRedisKeys);
    logger.info("Room cache has been invalidated:", {
      roomRedisKeys,
      redisRoomsKeyPattern,
    });
  }
  return room;
};

// Get a single room by ID
const getSingleRoom = async (id: string) => {
  const cacheKey = `room_${id}`;

  // Check Redis cache
  const cacheRoom = await redisClient.get(cacheKey);
  if (cacheRoom) {
    return JSON.parse(cacheRoom);
  }
  // Querying Mongoose
  const room = await Rooms.findById(id).populate("sellerId", "name email");
  if (!room) {
    throw new Error("No room found");
  }

  // Caching result
  await redisClient.set(cacheKey, JSON.stringify(room), "EX", 5 * 60);
  return room;
};

// Update a room
const updateRoom = async (id: string, data: Partial<IRoom>) => {
  const room = await Rooms.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  );
  if (!room) {
    throw new Error("No room found");
  }
  return room;
};

// Delete a room
const deleteRoom = async (id: string) => {
  const room = await Rooms.findById(id);
  if (!room) {
    throw new Error("The room does not exist");
  }
  await Rooms.findByIdAndDelete(id);
  return { message: "The room has been successfully deleted" };
};

export {
  getAllRooms,
  getSellerRooms,
  createRoom,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};
