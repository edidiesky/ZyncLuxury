import dotenv from "dotenv";
import Redis from "ioredis";
dotenv.config();

if (!process.env.REDIS_URL) {
  throw new Error("No Redis URL has been provided!");
}
const redisClient = new Redis(process.env.REDIS_URL);
export default redisClient;
