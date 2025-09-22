import mongoose, { FilterQuery, Types } from "mongoose";
import Rooms, { IRoom, RoomType } from "../models/Rooms";
import redisClient from "../config/redisClient";
import { IAggregatedRoom, IRoomResult } from "../types";
import logger from "../utils/logger";

// Get all rooms with pagination and caching
const getAllRooms = async (
  queryObject: FilterQuery<Partial<IRoom>>,
  page: number = 1,
  limit: number = 9
): Promise<IRoomResult> => {
  const skip = (page - 1) * limit;
  const cacheKey = `rooms:${queryObject.sellerId}:${JSON.stringify(
    queryObject
  )}`;

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

  const listingStats = `seller:listing:stat:${sellerId}`;
  const listingKeys = await redisClient.keys(listingStats);
  if (roomRedisKeys.length > 0) {
    await redisClient.del(roomRedisKeys);
    await redisClient.del(listingKeys);
    logger.info("Room cache has been invalidated:", {
      roomRedisKeys,
      redisRoomsKeyPattern,
      listingKeys,
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

// get seller aggregated rooms
const getSellerAggregatedRoom = async ({ queryObject }: IAggregatedRoom) => {
  try {
    const cacheKey = `seller:listing:stat:${queryObject.sellerId}`;

    const testCount = await Rooms.countDocuments({
      sellerId: new Types.ObjectId(queryObject.sellerId),
    });

    // Check cache first
    const cachedResult = await redisClient.get(cacheKey);
    if (cachedResult) {
      logger.info("Returning cached seller listing stats", { cacheKey });
      return JSON.parse(cachedResult);
    }

    const roomPipeline = [
      {
        $match: {
          sellerId: new Types.ObjectId(queryObject.sellerId),
        },
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          villa: {
            $sum: { $cond: [{ $eq: ["$_id", "VILLA"] }, "$count", 0] },
          },
          hotel: {
            $sum: { $cond: [{ $eq: ["$_id", "HOTEL"] }, "$count", 0] },
          },
          apartment: {
            $sum: { $cond: [{ $eq: ["$_id", "APARTMENT"] }, "$count", 0] },
          },
          stay: {
            $sum: { $cond: [{ $eq: ["$_id", "STAY"] }, "$count", 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          villa: 1,
          hotel: 1,
          apartment: 1,
          stay: 1,
          totalListings: { $add: ["$villa", "$hotel", "$apartment", "$stay"] },
        },
      },
    ];

    logger.info("seller's id:", {
      sellerId: queryObject.sellerId,
    });

    logger.info("seller's objectId:", {
      sellerId: new Types.ObjectId(queryObject.sellerId),
    });
    const listingStats = await Rooms.aggregate(roomPipeline).exec();
    const result = listingStats[0] || {
      villa: 0,
      hotel: 0,
      apartment: 0,
      stay: 0,
      totalListings: 0,
    };

    // Cache for 5 minutes
    await redisClient.set(cacheKey, JSON.stringify(result), "EX", 300);
    logger.info("User chart data calculated and cached", {
      cacheKey,
      listingStats,
      testCount,
    });
    return result;
  } catch (error) {
    logger.error("Failed to aggregate seller's listings", {
      message:
        error instanceof Error
          ? error.message
          : "An unknown server error occurred",
      stack:
        error instanceof Error
          ? error.stack
          : "An unknown server error occurred",
    });
    throw error; // Re-throw to be handled by the controller
  }
};

export {
  getAllRooms,
  getSellerRooms,
  createRoom,
  getSingleRoom,
  updateRoom,
  deleteRoom,
  getSellerAggregatedRoom,
};
