import express from "express";
const router = express.Router();

import {
  CreateUserReservation,
  GetUserReservation,
  GetSingleReservation,
  UpdateReservations,
  DeleteReservations,
  GetAllReservation,
} from "../controllers/reservation.controller";
import { authenticate, authorization } from "../middleware/authentication";

router.route("/user").get(authenticate, GetUserReservation);
router
  .route("/history")
  .get(authenticate, authorization(["ADMIN", "SELLER"]), GetAllReservation);
router
  .route("/:id")
  .post(authenticate, CreateUserReservation)
  .get(authenticate, GetSingleReservation)
  .delete(authenticate, DeleteReservations)
  .put(authenticate, UpdateReservations);

export default router;
