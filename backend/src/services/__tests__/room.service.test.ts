import { jest, describe, it, afterAll, expect } from "@jest/globals";
import Rooms, { IRoom } from "../../models/Rooms";
import { apartmentDataList } from "../../data/roomdata";
import redisClient from "../../config/redisClient";
import mongoose, { FilterQuery, Types } from "mongoose";
import { getAllRooms } from "../room.service";
import { IRoomResult } from "../../types";
// MOCK MODULES
jest.mock("../../models/Rooms", () => ({
  find: jest.fn(),
  countDocuments: jest.fn(),
}));

jest.mock("../../config/redisClient", () => ({
  get: jest.fn<() => Promise<string | null>>().mockResolvedValue(null),
  set: jest
    .fn<
      (
        key: string,
        value: string,
        method: string,
        timeout: number
      ) => Promise<string>
    >()
    .mockResolvedValue("OK"),
}));
const MockedRooms = Rooms as jest.Mocked<typeof Rooms>;
const MockedRedis = redisClient as any;

// DESCRIBING THE TESTS SUITE
describe("ROOM SERVICE API TESTS", () => {
  const sellerId = new Types.ObjectId("66c0a27e71a3ea08d6a26f8f");
  afterAll(async () => {
    jest.clearAllMocks();
    await redisClient.quit();
    await mongoose.connection.close();
  });
  // DESCRIBE GET ROOM SERVICE
  describe("GET ROOM SERVICE", () => {
    it("should get all rooms based on the right filter query", async () => {
      // ARRANGE
      const queryChain = {
        skip: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnValue(apartmentDataList),
      };
      const queryObject: FilterQuery<IRoom> = {
        sellerId,
      };
      const page = 1;
      const limit = 10;
      const skip = (page - 1) * 10;
      const sort = { createdAt: -1 };
      const cacheKey = `rooms:${sellerId}:${JSON.stringify(queryObject)}`;
      MockedRooms.find.mockReturnValue(queryChain as any);
      MockedRooms.countDocuments.mockResolvedValue(apartmentDataList.length);
      MockedRedis.set.mockResolvedValue("OK");
      // ACT
      const result = await getAllRooms(queryObject, page, limit);
      // ASSERT
      //   expect(MockedRedis.get).toHaveBeenCalledWith(cacheKey);
      expect(MockedRooms.find).toHaveBeenCalledWith(queryObject);
      expect(queryChain.lean).toHaveBeenCalled();
      expect(queryChain.limit).toHaveBeenCalledWith(limit);
      expect(queryChain.skip).toHaveBeenCalledWith(skip);
      expect(queryChain.sort).toHaveBeenCalledWith(sort);
      expect(MockedRooms.countDocuments).toHaveBeenCalledWith(queryObject);
      expect(queryChain.populate).toHaveBeenCalledWith(
        "sellerId",
        "name email"
      );
      expect(MockedRedis.set).toHaveBeenCalledWith(
        cacheKey,
        JSON.stringify(result),
        "EX",
        60 * 30
      );
      expect(result).toEqual({
        data: apartmentDataList,
        success: true,
        message: "Rooms has been fetched succesfully!",
        pagination: {
          noOfPages: 1,
          totalRooms: apartmentDataList.length,
          currentPage: page,
          limit,
        },
      });
    });
    it("should return cached rooms if available in the cache", async () => {
      // ARRANGE
      const queryObject: FilterQuery<IRoom> = {
        sellerId,
      };
      const page = 1;
      const limit = 10;
      const cacheKey = `rooms:${sellerId}:${JSON.stringify(queryObject)}`;
      const cachedResult: IRoomResult = {
        data: apartmentDataList.map((room) => ({
          ...room,
          createdAt: new Date(room.createdAt),
          updatedAt: new Date(room.updatedAt),
        })),
        success: true,
        message: "Rooms has been fetched succesfully!",
        pagination: {
          noOfPages: 1,
          totalRooms: apartmentDataList.length,
          currentPage: page,
          limit,
        },
      };
      // ACT
      MockedRedis.get.mockResolvedValue(JSON.stringify(cachedResult));
      const result = await getAllRooms(queryObject, page, limit);
      // ASSERT
      expect(MockedRedis.get).toHaveBeenCalledWith(cacheKey);
      expect(MockedRooms.find).not.toHaveBeenCalled();
      expect(MockedRooms.countDocuments).not.toHaveBeenCalled();
      expect(MockedRedis.set).not.toHaveBeenCalled();
      expect(result).toEqual(cachedResult);
    });
  });
  // DESCRIBE CREATE ROOM SERVICE
  describe("CREATE ROOM SERVICE", () => {});
  // DESCRIBE GET SINGLE ROOM SERVICE
  describe("GET SINGLE ROOM SERVICE", () => {});
  // DESCRIBE UPDATE ROOM SERVICE
  describe("UPDATE ROOM SERVICE", () => {});
  // DESCRIBE DELETE ROOM SERVICE
  describe("DELETE ROOM SERVICE", () => {});
});
