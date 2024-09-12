import asyncHandler from "express-async-handler";
import prisma from "../prisma/index.js";

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
    limit = 12,
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
  const rooms = await prisma.rooms.findMany({
    where: queryObject,
    skip: parseInt(skip),
    take: parseInt(limit),
    orderBy: {
      createdAt: "desc",
    },
  });
  // get the total rooms and the total pages
  const totalRooms = await prisma.rooms.count({ where: queryObject });
  const noOfPages = Math.ceil(totalRooms / limit);
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  return res.json({ rooms, noOfPages, totalRooms });
});

const GetAllRoomAndReservations = asyncHandler(async (req, res) => {
  const rooms = await prisma.rooms.findMany({
    include: {
      reservations: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  return res.json(rooms);
});
const GetAllAdminRooms = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 6;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  const totalRoom = await prisma.rooms.count({});

  const rooms = await prisma.rooms.findMany({
    skip: skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const noOfPages = Math.ceil(totalRoom / limit);
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ rooms, noOfPages, totalRoom });
});
const CreateRooms = asyncHandler(async (req, res) => {
  const room = await prisma.rooms.create({
    data: {
      userid: req.user?.userId,
      ...req.body,
    },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  return res.json(room);
});

const GetSingleRoom = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const room = await prisma.rooms.findUnique({
    where: {
      id: id,
    },
  });

  if (!room) {
    return NextResponse.json(
      { message: "No room has being found" },
      { status: 404 }
    );
  }
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  return res.json(room);
});
const UpdateRoom = asyncHandler(async (req, res) => {
  const updateRoom = await prisma.rooms.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ updateRoom });
});
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
  GetAllAdminRooms,
  UpdateRoom,
};
