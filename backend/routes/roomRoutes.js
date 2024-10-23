import express from "express";
const router = express.Router();
import {
  adminMiddleware,
  authMiddleware,
} from "../middleware/authentication.js";

import {
  CreateRooms,
  GetAllRoom,
  GetSingleRoom,
  DeleteRoom,
  GetAllSellerRooms,
  GetAllRoomAndReservations,
  UpdateRoom,
} from "../controllers/roomControllers.js";

router
  .route("/")
  .get(GetAllRoom)
  .post(authMiddleware, CreateRooms);
router.route("/admin").get(authMiddleware, adminMiddleware, GetAllSellerRooms);
router
  .route("/room-reservation-history")
  .get(authMiddleware, adminMiddleware, GetAllRoomAndReservations);
router
  .route("/:id")
  .get(GetSingleRoom)
  .delete(authMiddleware, adminMiddleware, DeleteRoom)
  .put(authMiddleware, adminMiddleware, UpdateRoom);

export default router;
