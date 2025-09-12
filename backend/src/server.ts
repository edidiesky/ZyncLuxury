import mongoose from "mongoose";
import { errorHandler, NotFound } from "./middleware/error-handler";
import { connectMongoDB } from "./utils/connectDB";
import logger from "./utils/logger";
import app from "./app";

const mongoUrl = process.env.DATABASE_URL;
if (!mongoUrl) {
  throw new Error("MongoDB connection string is not defined.");
}

// Connecting to MongoDB
connectMongoDB(mongoUrl).catch((err) =>
  logger.error("MongoDB connection error:", err)
);

/** ERROR MIDDLEWARE */
app.use(NotFound);
app.use(errorHandler);
