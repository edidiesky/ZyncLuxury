import mongoose from "mongoose";
import logger from "./logger";

export const connectMongoDB = async (
  mongoUrl: string,
  maxRetries: number = 5,
  retryDelay: number = 3000
): Promise<void> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await mongoose.connect(mongoUrl, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 30000,
        retryWrites: true,
        retryReads: true,
      });
      logger.info("MongoDB connected successfully");
      return;
    } catch (error: any) {
      logger.error(`MongoDB connection attempt ${attempt} failed`, {
        error: error.message,
        code: error.code, // e.g., EAI_AGAIN
      });

      if (attempt === maxRetries) {
        logger.error("Max MongoDB connection retries reached", { error });
        throw new Error("Failed to connect to MongoDB after maximum retries");
      }

      // Exponential backoff: 3s, 6s, 12s, etc.
      await new Promise((resolve) =>
        setTimeout(resolve, retryDelay * Math.pow(2, attempt - 1))
      );
    }
  }
};
