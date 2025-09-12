import swaggerUi from "swagger-ui-express";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route";
import roomRoutes from "./routes/room.route";
import reservationRoutes from "./routes/reservation.route";
import dotenv from "dotenv";
import logger from "./utils/logger";
import mongoose from "mongoose";
import { errorHandler, NotFound } from "./middleware/error-handler";
import { connectMongoDB } from "./utils/connectDB";
dotenv.config();
const app = express();
if (!process.env.WEB_ORIGIN) {
  throw new Error("No WEB_ORIGIN value");
}
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
const apiLimiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again after 20 minutes",
});
app.use(apiLimiter);
app.use(
  cors({
    origin: [process.env.WEB_ORIGIN],
    credentials: true,
  })
);

app.use(express.json());

/** ROUTES */
app.use("/api/v1/room", roomRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/reservation", reservationRoutes);

/** HEALTH CHECK */
app.get("/", (req, res) => {
  res.json({ message: "API is running fine!!!" });
});
const PORT = process.env.PORT;

/** ERROR MIDDLEWARE */
app.use(NotFound);
app.use(errorHandler);
app.listen(PORT, async () => {
  const mongoUrl = process.env.DATABASE_URL;
  if (!mongoUrl) {
    throw new Error("MongoDB connection string is not defined.");
  }
  try {
    await connectMongoDB(mongoUrl);
  } catch (error) {}
});
