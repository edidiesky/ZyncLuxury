import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../services/favourites.service";
import {
  SUCCESSFULLY_CREATED_STATUS_CODE,
  SUCCESSFULLY_FETCHED_STATUS_CODE,
  SERVER_ERROR_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
} from "../constant";
import mongoose from "mongoose";

// @description Add a room to user's favorites
// @route POST /favorites
// @access Private
const AddFavorite = asyncHandler(async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { userId } = req.user as { userId: string };
  const { roomId } = req.body;
  const result = await addFavorite(userId, roomId, session);
  res
    .status(
      result.success
        ? SUCCESSFULLY_CREATED_STATUS_CODE
        : BAD_REQUEST_STATUS_CODE
    )
    .json(result);
});

// @description Remove a room from user's favorites
// @route DELETE /favorites/:roomId
// @access Private
const RemoveFavorite = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.user as { userId: string };
  const { roomId } = req.params;

  const result = await removeFavorite(userId, roomId);
  res.status(SUCCESSFULLY_FETCHED_STATUS_CODE).json(result);
});

// @description Get user's favorite rooms
// @route GET /favorites
// @access Private
const GetFavorites = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.user as { userId: string };
  const { page = 1, limit = 10 } = req.query;

  const result = await getFavorites(userId, Number(page), Number(limit));
  res.status(SUCCESSFULLY_FETCHED_STATUS_CODE).json(result);
});

export { AddFavorite, RemoveFavorite, GetFavorites };
