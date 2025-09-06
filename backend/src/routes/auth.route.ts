import express from "express";
import { LoginUser, registerUser } from "../controllers/auth.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { signinSchema, signupSchema } from "../validators/auth.validator";
const router = express.Router();

router.post("/register", validateRequest(signupSchema), registerUser);
router.post("/login", validateRequest(signinSchema), LoginUser);

export default router;
