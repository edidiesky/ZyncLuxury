import express from "express";
import {
  CreateReview,
  GetRoomReviews,
  UpdateReview,
  DeleteReview,
} from "../controllers/review.controller";
import { authenticate } from "../middleware/authentication";
import { validateRequest } from "../middleware/validate.middleware";
import { reviewSchema } from "../validators/review.validator";

const router = express.Router();

router.post("/", validateRequest(reviewSchema), authenticate, CreateReview);
router.get("/:roomId", GetRoomReviews);
router.put("/:reviewId", authenticate, UpdateReview);
router.delete("/:reviewId", authenticate, DeleteReview);

export default router;
