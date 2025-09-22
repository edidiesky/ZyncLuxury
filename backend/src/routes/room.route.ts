import express from "express";
const router = express.Router();

import {
  CreateRooms,
  GetAllRoom,
  GetSingleRoom,
  DeleteRoom,
  GetAllSellerRooms,
  UpdateRoom,
  GetSellerAggregatedRoom,
} from "../controllers/room.controller";
import { authenticate, authorization } from "../middleware/authentication";
import { validateRequest } from "../middleware/validate.middleware";
import { createRoomSchema } from "../validators/room.validator";

router
  .route("/stats")
  .get(
    authenticate,
    authorization(["ADMIN", "SELLER"]),
    GetSellerAggregatedRoom
  );
router
  .route("/")
  .get(GetAllRoom)
  .post(
    authenticate,
    authorization(["ADMIN", "SELLER"]),
    validateRequest(createRoomSchema),
    CreateRooms
  );
router
  .route("/admin")
  .get(authenticate, authorization(["ADMIN", "SELLER"]), GetAllSellerRooms);
router
  .route("/:id")
  .get(GetSingleRoom)
  .delete(authenticate, authorization(["ADMIN", "SELLER"]), DeleteRoom)
  .put(authenticate, authorization(["ADMIN", "SELLER"]), UpdateRoom);

export default router;
