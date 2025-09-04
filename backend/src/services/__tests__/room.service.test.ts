import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { FilterQuery, Types } from "mongoose";
import Rooms, { IRoom } from "../../models/Rooms";
import { getAllRooms } from "../room.service";
import { apartmentDataList } from "../../data/roomdata";
import redisClient from "../../config/redisClient";
import { IRoomResult } from "../../types";

// Mock dependencies
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
        mode: string,
        duration: number
      ) => Promise<string>
    >()
    .mockResolvedValue("OK"),
}));

const MockedRooms = Rooms as jest.Mocked<typeof Rooms>;
const MockedRedisClient = redisClient as any;

describe("ROOM API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("SHOULD GET ALL ROOMS BASED ON FILTER QUERY PARAMETERS", async () => {
    // Arrange
    const sellerId = new Types.ObjectId("66c0a27e71a3ea08d6a26f8f");
    const queryObject: FilterQuery<IRoom> = { sellerId };
    const page = 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    // Mock Redis to return no cached data
    MockedRedisClient.get.mockResolvedValue(null);

    // Mock Mongoose query chain
    const queryChain = {
      populate: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      lean: jest.fn().mockReturnValue(apartmentDataList),
    };
    MockedRooms.find.mockReturnValue(queryChain as any);

    // Mock countDocuments
    MockedRooms.countDocuments.mockResolvedValue(apartmentDataList.length);

    // Mock Redis set
    MockedRedisClient.set.mockResolvedValue("OK");

    // Act
    const result = await getAllRooms(queryObject, page, limit);

    // Assert
    expect(MockedRedisClient.get).toHaveBeenCalledWith(
      `rooms_${JSON.stringify(queryObject)}`
    );
    expect(MockedRooms.find).toHaveBeenCalledWith(queryObject);
    expect(queryChain.populate).toHaveBeenCalledWith("sellerId", "name email");
    expect(queryChain.skip).toHaveBeenCalledWith(skip);
    expect(queryChain.lean).toHaveBeenCalled();
    expect(queryChain.limit).toHaveBeenCalledWith(limit);
    expect(queryChain.sort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(MockedRooms.countDocuments).toHaveBeenCalledWith(queryObject);
    expect(MockedRedisClient.set).toHaveBeenCalledWith(
      `rooms_${JSON.stringify(queryObject)}`,
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
});
