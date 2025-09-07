import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectMongoDB } from "../utils/connectDB";
import Rooms from "../models/Rooms";
import { apartmentDataList } from "../data/roomdata";
import { CHUNCK_SIZE } from "../constant";
import logger from "../utils/logger";
dotenv.config();

const mongoUrl = process.env.DATABASE_URL;
if (!mongoUrl) {
  throw new Error("MongoDB connection string is not defined.");
}

const importData = async () => {
  await connectMongoDB(mongoUrl);
  let insertCount = 0;
  try {
    for (let i = 0; i < apartmentDataList.length; i += CHUNCK_SIZE) {
      const insertedCount = await Rooms.insertMany(
        apartmentDataList.slice(i, i + CHUNCK_SIZE),
        {
          ordered: false,
        }
      );
      insertCount += insertedCount.length;
    }

    logger.info("Data Imported!", {
      insertCount,
    });
    process.exit();
  } catch (error: any) {
    logger.error("Error importing data:", {
      message: error.message,
      stack: error.stack,
      details: error.details,
    });
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Use Prisma to delete data
    await Rooms.deleteMany();
    logger.info("Data Destroyed!");
    process.exit();
  } catch (error: any) {
    logger.error("Error destroying data:", {
      message: error.message,
      stack: error.stack,
      details: error.details,
    });
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
