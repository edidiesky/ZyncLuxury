import asyncHandler from "express-async-handler";
import prisma from "../prisma/index.js";
import redisClient from "../utils/redisClient.js";
// @description  Get all room
// @route  GET /room
// @access  Public
const GetAllRoom = asyncHandler(async (req, res) => {
  const {
    maxPrice,
    startDate,
    endDate,
    minPrice,
    country,
    type,
    bedroom,
    bathroom,
    title,
    limit = 6,
    page = 1,
  } = req.query;
  const roomstartDate = startDate ? new Date(startDate) : null;
  const roomendDate = endDate ? new Date(endDate) : null;
  // render the various key when it has a value in the queryObject
  const queryObject = {
    ...(type && { type }),
    ...(bedroom && { bedroom: Number(bedroom) }),
    ...(bathroom && { bathroom: Number(bathroom) }),
    ...(country && { country }),
    ...(title && { title }),
    ...(minPrice && { price: { gte: minPrice } }),
    ...(maxPrice && { price: { lte: maxPrice } }),
    ...(roomendDate &&
      roomstartDate && {
        reservations: {
          none: {
            OR: [
              {
                AND: [
                  {
                    startDate: { gte: roomstartDate },
                    endDate: { lte: roomendDate },
                  },
                ],
              },
            ],
          },
        },
      }),
  };
  // calculate the pagination
  const skip = (page - 1) * limit;
  const cacheKey = "rooms";
  const cacheRooms = await redisClient.get(cacheKey);
  if (cacheRooms) {
    return res.json(cacheRooms);
  } else {
    const rooms = await prisma.rooms.findMany({
      where: queryObject,
      skip: parseInt(skip),
      take: parseInt(limit),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    // get the total rooms and the total pages
    const totalRooms = await prisma.rooms.count({ where: queryObject });
    const noOfPages = Math.ceil(totalRooms / limit);
    const result = { rooms, noOfPages, totalRooms };
    await redisClient.set(cacheKey, result, { EX: 3600 });
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    return res.json(result);
  }
});

const GetAllRoomAndReservations = asyncHandler(async (req, res) => {});
// @description  Get a seller rooms
// @route  GET /rooms/13344
// @access  Private
const GetAllSellerRooms = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 6;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  const totalRoom = await prisma.rooms.count({});
  const rooms = await prisma.rooms.findMany({
    where: {
      sellerid: req.user?.userId,
    },
    skip: skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const noOfPages = Math.ceil(totalRoom / limit);
  const result = { rooms, noOfPages, totalRoom };
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  return res.json(result);
});

// @description  Create a room for the seller
// @route  POST /room
// @access  Private
const CreateRooms = asyncHandler(async (req, res) => {
  const room = await prisma.rooms.create({
    data: {
      user: {
        connect: { id: req.user.userId },
      },
      ...req.body,
    },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  return res.json(room);
});

// @description  Get a single room for the user
// @route  GET /room/34545
// @access  Public
const GetSingleRoom = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const cacheKey = `room_${id}`;
  const cacheRooms = await redisClient.get(cacheKey);
  if (cacheRooms) {
    return res.json(cacheRooms);
  } else {
    const room = await prisma.rooms.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });

    if (!room) {
      return NextResponse.json(
        { message: "No room has being found" },
        { status: 404 }
      );
    }
    await redisClient.set(cacheKey, room, { EX: 60 });

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    return res.json(room);
  }
});

// @description  Update a room for the seller
// @route  PUT /room/4566
// @access  Private
const UpdateRoom = asyncHandler(async (req, res) => {
  const updateRoom = await prisma.rooms.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ updateRoom });
});

// @description  Delete a room for the seller
// @route  DELETE /room/4566
// @access  Private
const DeleteRoom = asyncHandler(async (req, res) => {
  const rooms = await prisma.rooms.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!rooms) {
    res.status(404);
    throw new Error("The rooms does not exist");
  }
  await prisma.rooms.delete({
    where: { id: req.params.id },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ msg: "The rooms has been successfully deleted" });
});
export {
  GetAllRoom,
  GetAllRoomAndReservations,
  CreateRooms,
  GetSingleRoom,
  DeleteRoom,
  GetAllSellerRooms,
  UpdateRoom,
};
