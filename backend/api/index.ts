import { VercelRequest, VercelResponse } from '@vercel/node';
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "../src/routes/auth.route";
import roomRoutes from "../src/routes/room.route";
import reservationRoutes from "../src/routes/reservation.route";
import dotenv from "dotenv";
import { errorHandler, NotFound } from "../src/middleware/error-handler";
import { connectMongoDB } from "../src/utils/connectDB";

dotenv.config();

let app: express.Application | null = null;

const initializeApp = async () => {
  if (app) return app;

  app = express();

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

  app.get("/api", (req, res) => {
    res.json({ message: "API is running fine!!!" });
  });

  /** ERROR MIDDLEWARE */
  app.use(NotFound);
  app.use(errorHandler);

  // Connect to MongoDB
  const mongoUrl = process.env.DATABASE_URL;
  if (mongoUrl) {
    try {
      await connectMongoDB(mongoUrl);
    } catch (error) {
      console.error('MongoDB connection failed:', error);
    }
  }

  return app;
};

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const appInstance = await initializeApp();
    return appInstance(req, res);
  } catch (error) {
    console.error('Error initializing app:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};