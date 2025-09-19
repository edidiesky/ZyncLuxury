import express from "express";
import {
  AddFavorite,
  RemoveFavorite,
  GetFavorites,
} from "../controllers/favourites.controller";
import { authenticate } from "../middleware/authentication";
import { validateRequest } from "../middleware/validate.middleware";
import { favouriteSchema } from "../validators/favourite.validator";
const router = express.Router();

router.post("/", validateRequest(favouriteSchema), authenticate, AddFavorite);
router.delete("/:roomId", authenticate, RemoveFavorite);
router.get("/", authenticate, GetFavorites);

export default router;