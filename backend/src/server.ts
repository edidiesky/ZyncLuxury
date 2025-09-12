import mongoose from "mongoose";
import { errorHandler, NotFound } from "./middleware/error-handler";
import { connectMongoDB } from "./utils/connectDB";
import logger from "./utils/logger";
import app from "./app";
const PORT = process.env.PORT || 3000;
async function GracefulShutdown() {
  logger.info("Shutting down gracefully!!");
  try {
    await mongoose.connection.close();
    logger.info("Mongoose has being disconnected!");
    process.exit(0);
  } catch (err) {
    console.error("Error during shutdown:", err);
    process.exit(1);
  }
}

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
