import { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

let app: express.Application | null = null;
let isDbConnected: boolean = false;

const initializeApp = async () => {
  if (app) return app;

  try {
    console.log("Initializing Express app...");
    app = express();

    // Basic middleware
    app.use(express.json());
    app.use(cookieParser());
    app.use(helmet());

    app.use(
      cors({
        origin: process.env.WEB_ORIGIN || "*",
        credentials: true,
      })
    );

    if (!isDbConnected) {
      try {
        console.log("Attempting database connection...");
        const { connectMongoDB } = await import("../src/utils/connectDB");

        // Add timeout to database connection
        const dbTimeout = new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Database connection timeout")),
            8000
          )
        );

        const mongoUrl = process.env.DATABASE_URL;
        if (mongoUrl) {
          await Promise.race([connectMongoDB(mongoUrl), dbTimeout]);
          isDbConnected = true;
          console.log("Database connected successfully");
        }
      } catch (dbError) {
        console.error("Database connection failed:", dbError);
      }
    }

    // Health check routes (keep these working first)
    app.get("/", (req, res) => {
      res.json({
        message: "ZyncLuxury API is running fine!",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
      });
    });

    app.get("/health", (req, res) => {
      res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
      });
    });

    try {
      const authRoutes = (await import("../src/routes/auth.route")).default;
      app.use("/api/v1/auth", authRoutes);
      console.log("Auth routes imported successfully");
    } catch (importError) {
      console.error("Auth route import failed:", importError);
    }

    try {
      const paymentRoutes = (await import("../src/routes/payment.route"))
        .default;
      app.use("/api/v1/payment", paymentRoutes);
      console.log("Payment routes imported successfully");
    } catch (importError) {
      console.error("Payment route import failed:", importError);
    }

    try {
      const { WebhookHandler } = await import("../src/webhook");
      app.get("/api/v1/payment/webhook", WebhookHandler);
      console.log("Payment webhook route imported successfully");
    } catch (importError) {
      console.error("Payment webhook route import failed:", importError);
    }

    try {
      console.log("Testing room route import...");
      const roomRoutes = (await import("../src/routes/room.route")).default;
      app.use("/api/v1/room", roomRoutes);
      console.log("Room routes imported successfully");
    } catch (importError) {
      console.error("Room route import failed:", importError);
    }

    try {
      console.log("Testing reservation route import...");
      const reservationRoutes = (
        await import("../src/routes/reservation.route")
      ).default;
      app.use("/api/v1/reservation", reservationRoutes);
      console.log("Reservation routes imported successfully");
    } catch (importError) {
      console.error("Reservation route import failed:", importError);
    }

    // Error handlers
    try {
      const { NotFound, errorHandler } = await import(
        "../src/middleware/error-handler"
      );
      app.use(NotFound);
      app.use(errorHandler);
    } catch (importError) {
      console.error("Error handler import failed:", importError);
      // Fallback error handlers
      app.use("*", (req, res) => {
        res.status(404).json({
          error: "Route not found",
          path: req.originalUrl,
        });
      });
    }

    console.log("Express app initialized successfully");
    return app;
  } catch (error) {
    console.error("Error initializing app:", error);
    throw error;
  }
};

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const appInstance = await initializeApp();
    return appInstance(req, res);
  } catch (error) {
    console.error("Function invocation error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
