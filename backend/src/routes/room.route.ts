import express from "express";
const router = express.Router();

import {
  CreateRooms,
  GetAllRoom,
  GetSingleRoom,
  DeleteRoom,
  GetAllSellerRooms,
  GetAllRoomAndReservations,
  UpdateRoom,
} from "../controllers/room.controller";
import { authenticate, authorization } from "../middleware/authentication";

router
  .route("/")
  .get(GetAllRoom)
  .post(authenticate, authorization(["ADMIN", "SELLER"]), CreateRooms);
router
  .route("/admin")
  .get(authenticate, authorization(["ADMIN", "SELLER"]), GetAllSellerRooms);
router
  .route("/room-reservation-history")
  .get(
    authenticate,
    authorization(["ADMIN", "SELLER"]),
    GetAllRoomAndReservations
  );
router
  .route("/:id")
  .get(GetSingleRoom)
  .delete(authenticate, authorization(["ADMIN", "SELLER"]), DeleteRoom)
  .put(authenticate, authorization(["ADMIN", "SELLER"]), UpdateRoom);

export default router;
