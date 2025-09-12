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
import { validateRequest } from "../middleware/validate.middleware";
import { reservationSchema } from "../validators/reservation.validator";
// Get user booking
router.route("/user").get(authenticate, GetUserReservation);
router
  .route("/history")
  .get(authenticate, authorization(["ADMIN", "SELLER"]), GetAllReservation);
router
  .route("/:roomId")
  .post(authenticate, validateRequest(reservationSchema), CreateUserReservation)
  .get(authenticate, GetSingleReservation)
  .delete(authenticate, DeleteReservations)
  .put(authenticate, UpdateReservations);



export default router;
