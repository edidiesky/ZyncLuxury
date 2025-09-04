import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  getUserReservations,
  getSellerReservations,
  getSingleReservation,
  createUserReservation,
  deleteReservation,
  updateReservation,
} from "../services/reservation.service";
import { IReservation } from "../models/Reservation";

// @description  Get a user's reservations
// @route  GET /reservation/user
// @access  Private
const GetUserReservation = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const reservations = await getUserReservations(req.user?.userId as string);
    res.json(reservations);
  }
);

// @description  Get all seller reservations using their seller ID
// @route  GET /reservation/history
// @access  Private
const GetAllReservation = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { limit = 6, page = 1 } = req.query;
    const result = await getSellerReservations(
      req.user?.userId as string,
      Number(page),
      Number(limit)
    );
    res.json(result);
  }
);

// @description  Get a single reservation for a user
// @route  GET /reservation/:id
// @access  Private
const GetSingleReservation = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const reservation = await getSingleReservation(
      req.params.id,
      req.user?.userId as string
    );
    res.json(reservation);
  }
);

// @description  Create a reservation for a user or admin or seller
// @route  POST /reservation/:id
// @access  Public
const CreateUserReservation = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.user as { userId: string };
    const reservation = await createUserReservation(
      req.params.id,
      userId,
      req.body as Partial<IReservation>
    );
    res.json(reservation);
  }
);

// @description  Delete a reservation for a user or admin or seller
// @route  DELETE /reservation/:id
// @access  Public
const DeleteReservations = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await deleteReservation(req.params.id);
    res.json(result);
  }
);

// @description  Update a reservation for admin or seller
// @route  PUT /reservation/:id
// @access  Private
const UpdateReservations = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { roomid } = req.query;
    const updatedReservation = await updateReservation(
      req.params.id,
      roomid as string,
      req.body as Partial<IReservation>
    );
    res.json(updatedReservation);
  }
);

export {
  GetUserReservation,
  GetAllReservation,
  CreateUserReservation,
  GetSingleReservation,
  DeleteReservations,
  UpdateReservations,
};
