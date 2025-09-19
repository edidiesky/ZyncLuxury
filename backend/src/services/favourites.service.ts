import mongoose, { Types } from "mongoose";
import User from "../models/User";
import Rooms from "../models/Rooms";
import logger from "../utils/logger";
// Add a room to user's favorites
export const addFavorite = async (
  userId: string,
  roomId: Types.ObjectId,
  session: mongoose.ClientSession
): Promise<{
  success: boolean;
  message: string;
  data: Types.ObjectId[] | null;
}> => {
  try {
    const user = await User.findById({ _id: userId }).session(session);
    if (!user) {
      logger.error("This user has no record with us:", {
        user,
      });
      throw new Error(
        "You have no record with us. You can proceed further by creating an account with us"
      );
    }

    const room = await Rooms.findById(roomId).session(session);
    if (!room) {
      logger.error("This room has no record with us:", {
        room,
      });
      throw new Error("This room has no record with us");
    }

    if (user.favourites.includes(roomId)) {
      throw new Error(
        "This room is already part of your favorites collection."
      );
    }

    user.favourites.push(roomId);
    await user.save({ session });

    logger.info("Room added to favorites", { userId, roomId });

    await session.commitTransaction();
    return {
      success: true,
      message: "Room added to favorites successfully",
      data: user.favourites,
    };
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    logger.error("Error adding favorite", {
      error: error instanceof Error ? error.message : "Unknown error",
    });

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to add favorite",
      data: null,
    };
  } finally {
    // ending the session
    await session.endSession();
  }
};

// Remove a room from user's favorites
export const removeFavorite = async (
  userId: string,
  roomId: string
): Promise<{
  success: boolean;
  message: string;
  data: Types.ObjectId[] | null;
}> => {
  let newroomId = new Types.ObjectId(roomId);
  try {
    if (!mongoose.isValidObjectId(roomId)) {
      throw new Error("Room Id ought to be a valid mogoose Object id.");
    }

    const user = await User.findById({ _id: userId });
    if (!user) {
      logger.error("This user has no record with us:", {
        user,
      });
      throw new Error(
        "You have no record with us. You can proceed further by creating an account with us"
      );
    }

    const room = await Rooms.findById(roomId);
    if (!room) {
      logger.error("This room has no record with us:", {
        room,
      });
      throw new Error("This room has no record with us");
    }

    if (user.favourites.includes(newroomId)) {
      throw new Error(
        "This room is already part of your favorites collection."
      );
    }
    user.favourites = user.favourites.filter((id) => id !== newroomId);
    await user.save();

    logger.info("Room removed from favorites", { userId, roomId });
    return {
      success: true,
      message: "Room removed from favorites successfully",
      data: user.favourites,
    };
  } catch (error) {
    logger.error("Error removing favorite", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw new Error(
      error instanceof Error ? error.message : "Failed to remove favorite"
    );
  }
};

// Get user's favorite rooms
export const getFavorites = async (
  userId: string,
  page: number = 1,
  limit: number = 10
): Promise<{
  success: boolean;
  message: string;
  data: any[];
  total: number;
  page: number;
  limit: number;
}> => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      logger.error("This user has no record with us:", {
        user,
      });
      throw new Error(
        "You have no record with us. You can proceed further by creating an account with us"
      );
    }

    const skip = (page - 1) * limit;
    const favoriteRooms = await Rooms.find({
      _id: { $in: user.favourites },
    })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = user.favourites.length;

    logger.info("Fetched user favorites", { userId, total });
    return {
      success: true,
      message: "Favorites fetched successfully",
      data: favoriteRooms,
      total,
      page,
      limit,
    };
  } catch (error) {
    logger.error("Error fetching favorites", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch favorites"
    );
  }
};
