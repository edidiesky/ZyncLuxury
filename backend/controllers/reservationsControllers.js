import asyncHandler from "express-async-handler";
import moment from "moment";
import { parse, formatISO } from "date-fns";
import prisma from "../prisma/index.js";

// @description  Get a seller reservation
// @route  GET /reservation/user
// @access  Private
const GetUserReservation = asyncHandler(async (req, res) => {
  const availableRooms = await prisma.reservations.findMany({
    where: {
      userid: req.user.userId,
    },
    include: {
      user: true,
      rooms: true,
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.json(availableRooms);
});

// @description  Get all seller reservation using his seller ID
// @route  GET /reservation/history
// @access  Private
const GetAllReservation = asyncHandler(async (req, res) => {
  const availableRooms = await prisma.reservations.findMany({
    where: {
      sellerId: req.user.userid,
    },
    include: {
      user: true,
      rooms: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.json(availableRooms);
});

// @description  Get a singke reservation for a user
// @route  GET /reservation/:id
// @access  Private
const GetSingleReservation = asyncHandler(async (req, res) => {
  const availableRooms = await prisma.reservations.findUnique({
    where: {
      userid: req.user.userId,
      id: req.params.id,
    },
    include: {
      user: true,
      rooms: true,
    },
  });
  return res.json(availableRooms);
});


// @description  Create a reservation using for a user or admin or seller
// @route  POST /reservation/:id
// @access  Public
const CreateUserReservation = asyncHandler(async (req, res) => {
  let {
    startDate,
    endDate,
    status,
    totalPrice,
    guests,
    patchguests,
    partpaymentPrice,
  } = req.body;
  const id = req.params.id;
  startDate = formatISO(parse(startDate, "MMMM do yyyy", new Date()));
  endDate = formatISO(parse(endDate, "MMMM do yyyy", new Date()));
  // check for available rooms
  const availableRooms = await prisma.reservations.findMany({
    where: {
      roomid: id,
      OR: [
        {
          AND: [
            { startDate: { lte: startDate } },
            { endDate: { gte: startDate } },
          ],
        },
        {
          AND: [{ startDate: { lte: endDate } }, { endDate: { gte: endDate } }],
        },
      ],
    },
  });
  if (availableRooms.length > 0) {
    res.status(404);
    throw new Error(
      "This Room has already been booked for one or more days in your selected period!"
    );
  }

  // Book the room
  const reservationData = {
    startDate,
    endDate,
    totalPrice,
    status: status,
    guests: guests,
    patchguests,
    partpaymentPrice: Number(partpaymentPrice),
    user: {
      connect: { id: req.user.userId },
    },
    rooms: {
      connect: { id: id },
    },
  };

  const newReservation = await prisma.reservations.create({
    data: reservationData,
  });

  await prisma.rooms.update({
    where: { id },
    data: {
      reservations: {
        connect: { id: newReservation?.id },
      },
    },
  });

  return res.json(newReservation);
});

// @description  Delete a reservation using for a user or admin or seller
// @route  DELETE /reservation/:id
// @access  Public
const DeleteReservations = asyncHandler(async (req, res) => {
  const reservations = await prisma.reservations.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!reservations) {
    res.status(404);
    throw new Error("The reservations does not exist");
  }
  await prisma.payment.deleteMany({
    where: { reservationId: req.params.id },
  });
  await prisma.reservations.delete({
    where: { id: req.params.id },
  });

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res
    .status(200)
    .json({ msg: "The reservations has been successfully deleted" });
});

// @description  Update a reservation for admin or seller
// @route  PUT /reservation/:id
// @access  Private
const UpdateReservations = asyncHandler(async (req, res) => {
  let {
    startDate,
    endDate,
    status,
    totalPrice,
    guests,
    patchguests,
    partpaymentPrice,
  } = req.body;
  const roomid = req.query.roomid;

  // Parse and format dates to ISO-8601
  startDate = new Date(startDate).toISOString();
  endDate = new Date(endDate).toISOString();

  // Find the existing reservation
  const reservation = await prisma.reservations.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!reservation) {
    res.status(404);
    throw new Error("The reservation does not exist");
  }

  // Find the next reservation whose start date will be used to adjust the end date
  const nextReservation = await prisma.reservations.findFirst({
    where: {
      roomid: roomid,
      startDate: {
        gte: reservation.endDate, // Start date after or equal to the current start date
      },
    },
    orderBy: {
      startDate: "asc", // Get the earliest start date
    },
  });

  if (
    nextReservation &&
    new Date(nextReservation.startDate) > new Date(endDate)
  ) {
    // Adjust the end date to the start date of the next reservation
    endDate = new Date(nextReservation.startDate).toISOString();
  }
  // console.log(endDate)
  // Check for overlapping reservations
  const overlappingReservations = await prisma.reservations.findMany({
    where: {
      roomid: roomid,
      AND: [
        { id: { not: req.params.id } }, // Exclude current reservation from the check
        {
          OR: [
            {
              AND: [
                { startDate: { lte: startDate } },
                { endDate: { gte: startDate } },
              ],
            },
            {
              AND: [
                { startDate: { lte: endDate } },
                { endDate: { gte: endDate } },
              ],
            },
          ],
        },
      ],
    },
  });
  // console.log(overlappingReservations.length > 1)
  if (overlappingReservations.length > 1) {
    res.status(400);
    throw new Error(
      "This room is already booked for one or more days in your selected period."
    );
  }

  // // Proceed with the update
  const updatedReservation = await prisma.reservations.update({
    where: {
      id: req.params.id,
    },
    data: {
      startDate,
      endDate,
      status,
      totalPrice,
      guests,
      patchguests,
      partpaymentPrice,
    },
  });

  res.json(updatedReservation);
});
export {
  GetUserReservation,
  GetAllReservation,
  CreateUserReservation,
  GetSingleReservation,
  DeleteReservations,
  UpdateReservations,
};
