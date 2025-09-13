import { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

let app: express.Application | null = null;
let isDbConnected = false;

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

    // Database connection with timeout
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
          console.log("✅ Database connected successfully");
        }
      } catch (dbError) {
        console.error("❌ Database connection failed:", dbError);
        // Continue without database - don't crash the whole function
      }
    }

    // Health check routes
    app.get("/", (req, res) => {
      res.json({
        message: "ZyncLuxury API is running fine!",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
        database: isDbConnected ? "connected" : "disconnected",
      });
    });

    app.get("/health", (req, res) => {
      res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        database: isDbConnected ? "connected" : "disconnected",
      });
    });

    // Test auth routes first (likely to work)
    try {
      console.log("Loading auth routes...");
      const authRoutes = (await import("../src/routes/auth.route")).default;
      app.use("/api/v1/auth", authRoutes);
      console.log("✅ Auth routes loaded");
    } catch (importError) {
      console.error("❌ Auth route import failed:", importError);
    }

    // Add a simple test room route first
    app.get("/api/v1/room/test", (req, res) => {
      res.json({
        message: "Room test endpoint working",
        timestamp: new Date().toISOString(),
        database: isDbConnected ? "connected" : "disconnected",
      });
    });

    // Load room routes with error handling
    try {
      console.log("Loading room routes...");
      const roomRoutes = (await import("../src/routes/room.route")).default;
      app.use("/api/v1/room", roomRoutes);
      console.log("✅ Room routes loaded");
    } catch (importError) {
      console.error("❌ Room route import failed:", importError);
      // Add fallback route to show the error
      app.get("/api/v1/room/*", (req, res) => {
        res.status(503).json({
          error: "Room routes unavailable",
          message: "Room service is temporarily unavailable",
          details:
            importError instanceof Error
              ? importError.message
              : "Unknown error",
        });
      });
    }

    // Load reservation routes
    try {
      console.log("Loading reservation routes...");
      const reservationRoutes = (
        await import("../src/routes/reservation.route")
      ).default;
      app.use("/api/v1/reservation", reservationRoutes);
      console.log("✅ Reservation routes loaded");
    } catch (importError) {
      console.error("❌ Reservation route import failed:", importError);
    }

    // Error handlers
    try {
      const { NotFound, errorHandler } = await import(
        "../src/middleware/error-handler"
      );
      app.use(NotFound);
      app.use(errorHandler);
    } catch (importError) {
      console.error("❌ Error handler import failed:", importError);
      // Fallback error handlers
      app.use("*", (req, res) => {
        res.status(404).json({
          error: "Route not found",
          path: req.originalUrl,
        });
      });
    }

    console.log("✅ Express app initialized successfully");
    return app;
  } catch (error) {
    console.error("❌ Error initializing app:", error);
    throw error;
  }
};

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    // Add timeout for the entire request
    const requestTimeout = new Promise(
      (_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 25000) // 25 seconds (Vercel has 30s limit)
    );

    const appPromise = (async () => {
      await initializeApp();
    })();

    await Promise.race([appPromise, requestTimeout]);
  } catch (error) {
    console.error("❌ Function invocation error:", error);

    // Make sure we always send a response
    if (!res.headersSent) {
      res.status(500).json({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      });
    }
  }
};
