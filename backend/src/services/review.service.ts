import mongoose, { Types } from "mongoose";
import Review, { IReview } from "../models/Review";
import Rooms from "../models/Rooms";
import Reservations from "../models/Reservation";
import logger from "../utils/logger";

// Create a review
export const createReview = async (
  userId: string,
  roomId: string,
  reviewData: Partial<IReview>
): Promise<{ success: boolean; message: string; data: IReview | null }> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if user has a confirmed reservation for the room
    const reservation = await Reservations.findOne({
      userId,
      roomId,
      status: "CONFIRMED",
    }).session(session);

    if (!reservation) {
      throw new Error(
        "You can only review rooms you have a confirmed reservation for"
      );
    }

    const room = await Rooms.findById(roomId).session(session);
    if (!room) {
      throw new Error("Room not found");
    }

    const review = await Review.create(
      [
        {
          ...reviewData,
          userId,
          roomId,
          sellerId: room.sellerId,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    logger.info("Review created successfully", { userId, roomId });
    return {
      success: true,
      message: "Review created successfully",
      data: review[0],
    };
  } catch (error) {
    await session.abortTransaction();
    logger.error("Error creating review", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw new Error(
      error instanceof Error ? error.message : "Failed to create review"
    );
  } finally {
    await session.endSession();
  }
};

// Get reviews for a room
export const getRoomReviews = async (
  roomId: string,
  page: number = 1,
  limit: number = 10
): Promise<{
  success: boolean;
  message: string;
  data: IReview[];
  total: number;
  page: number;
  limit: number;
}> => {
  try {
    const skip = (page - 1) * limit;
    const reviews = await Review.find({ roomId })
      .populate("userId", "name image")
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Review.countDocuments({ roomId });

    logger.info("Fetched room reviews", { roomId, total });
    return {
      success: true,
      message: "Reviews fetched successfully",
      data: reviews,
      total,
      page,
      limit,
    };
  } catch (error) {
    logger.error("Error fetching reviews", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch reviews"
    );
  }
};

// Update a review
export const updateReview = async (
  userId: string,
  reviewId: string,
  reviewData: Partial<IReview>
): Promise<{ success: boolean; message: string; data: IReview | null }> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const review = await Review.findOne({
      _id: reviewId,
      userId,
    }).session(session);

    if (!review) {
      throw new Error("Review not found or you are not authorized to update it");
    }

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { $set: reviewData },
      { new: true, session }
    );

    await session.commitTransaction();
    logger.info("Review updated successfully", { userId, reviewId });
    return {
      success: true,
      message: "Review updated successfully",
      data: updatedReview,
    };
  } catch (error) {
    await session.abortTransaction();
    logger.error("Error updating review", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw new Error(
      error instanceof Error ? error.message : "Failed to update review"
    );
  } finally {
    await session.endSession();
  }
};

// Delete a review
export const deleteReview = async (
  userId: string,
  reviewId: string
): Promise<{ success: boolean; message: string; data: null }> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const review = await Review.findOne({
      _id: reviewId,
      userId,
    }).session(session);

    if (!review) {
      throw new Error("Review not found or you are not authorized to delete it");
    }

    await Review.deleteOne({ _id: reviewId }, { session });
    await session.commitTransaction();
    logger.info("Review deleted successfully", { userId, reviewId });
    return {
      success: true,
      message: "Review deleted successfully",
      data: null,
    };
  } catch (error) {
    await session.abortTransaction();
    logger.error("Error deleting review", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete review"
    );
  } finally {
    await session.endSession();
  }
};