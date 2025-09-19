import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  createReview,
  getRoomReviews,
  updateReview,
  deleteReview,
} from "../services/review.service";
import {
  SUCCESSFULLY_CREATED_STATUS_CODE,
  SUCCESSFULLY_FETCHED_STATUS_CODE,
  SERVER_ERROR_STATUS_CODE,
} from "../constant";

// @description Create a review for a room
// @route POST /reviews
// @access Private
const CreateReview = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.user as { userId: string };
  const { roomId, review, description } = req.body;

  const result = await createReview(userId, roomId, { review, description });
  res.status(SUCCESSFULLY_CREATED_STATUS_CODE).json(result);
});

// @description Get reviews for a room
// @route GET /reviews/:roomId
// @access Public
const GetRoomReviews = asyncHandler(async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const result = await getRoomReviews(roomId, Number(page), Number(limit));
  res.status(SUCCESSFULLY_FETCHED_STATUS_CODE).json(result);
});

// @description Update a review
// @route PUT /reviews/:reviewId
// @access Private
const UpdateReview = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.user as { userId: string };
  const { reviewId } = req.params;
  const { review, description } = req.body;

  const result = await updateReview(userId, reviewId, { review, description });
  res.status(SUCCESSFULLY_FETCHED_STATUS_CODE).json(result);
});

// @description Delete a review
// @route DELETE /reviews/:reviewId
// @access Private
const DeleteReview = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.user as { userId: string };
  const { reviewId } = req.params;

  const result = await deleteReview(userId, reviewId);
  res.status(SUCCESSFULLY_FETCHED_STATUS_CODE).json(result);
});

export { CreateReview, GetRoomReviews, UpdateReview, DeleteReview };
