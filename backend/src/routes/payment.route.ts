import express from "express";
const router = express.Router();

import {
  GetAllPayment,
  CreatePayment,
  GetSinglePayment,
  DeletePayment,
  GetAllSellerPayments,
  UpdatePayment,
} from "../controllers/payment.controller";
import { authenticate, authorization } from "../middleware/authentication";
import { validateRequest } from "../middleware/validate.middleware";
import { paymentSchema } from "../validators/payment.validator";

router
  .route("/")
  .get(GetAllPayment)
  .post(authenticate, validateRequest(paymentSchema), CreatePayment);
router
  .route("/admin")
  .get(authenticate, authorization(["ADMIN", "SELLER"]), GetAllSellerPayments);

router
  .route("/:id")
  .get(GetSinglePayment)
  .delete(authenticate, authorization(["ADMIN", "SELLER"]), DeletePayment)
  .put(authenticate, authorization(["ADMIN", "SELLER"]), UpdatePayment);

export default router;
