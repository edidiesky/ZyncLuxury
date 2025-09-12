import mongoose, { Types } from "mongoose";
import Reservations, {
  IReservation,
  ReservationStatus,
} from "../models/Reservation";
import Rooms from "../models/Rooms";
import Payment from "../models/Payment";
import redisClient from "../config/redisClient";

// Get all reservations for a user
const getUserReservations = async (userId: string) => {
  const reservations = await Reservations.find({
    userId: new Types.ObjectId(userId),
  })
    .populate("userId", "name email")
    .populate("roomId", "title price images")
    .populate("sellerId", "name email")
    .sort({ createdAt: -1 });
  return reservations;
};

// Get all reservations for a seller with pagination
const getSellerReservations = async (
  sellerId: string,
  page: number = 1,
  limit: number = 6
) => {
  const skip = (page - 1) * limit;
  const cacheKey = `seller_Reservations_${sellerId}`;

  // Check Redis cache
  const cachedReservations = await redisClient.get(cacheKey);
  if (cachedReservations) {
    return JSON.parse(cachedReservations);
  }

  // Query Mongoose
  const reservations = await Reservations.find({
    sellerId: new Types.ObjectId(sellerId),
  })
    .populate("userId", "name email")
    .populate("roomId", "title price")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalReservations = await Reservations.countDocuments({
    sellerId: new Types.ObjectId(sellerId),
  });
  const noOfPages = Math.ceil(totalReservations / limit);
  const result = { availableRooms: reservations, noOfPages, totalReservations };

  // Cache result
  await redisClient.set(cacheKey, JSON.stringify(result), "EX", 60 * 30);

  return result;
};

// Get a single reservation by ID for a user
const getSingleReservation = async (reservationId: string, userId: string) => {
  const cacheKey = `single_reservation_${reservationId}`;

  // Check Redis cache
  const cachedReservation = await redisClient.get(cacheKey);
  if (cachedReservation) {
    return JSON.parse(cachedReservation);
  }

  // Query Mongoose
  const reservation = await Reservations.findOne({
    _id: new Types.ObjectId(reservationId),
    userId: new Types.ObjectId(userId),
  })
    .populate("userId", "name email")
    .populate("roomId", "title price");

  if (!reservation) {
    throw new Error("No reservation found");
  }

  // Cache result
  await redisClient.set(cacheKey, JSON.stringify(reservation), "EX", 60 * 30);

  return reservation;
};

// Create a reservation
const createUserReservation = async (
  roomId: string,
  userId: string,
  data: Partial<IReservation>
): Promise<{
  success: boolean;
  data: IReservation | null;
  message: string;
}> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { startDate, endDate, status, totalPrice, guests } = data;

    // Parse and format dates
    const parsedStartDate = startDate ? new Date(startDate) : new Date();
    const parsedEndDate = endDate ? new Date(endDate) : new Date();

    // Check for room availability
    const overlappingReservations = await Reservations.find({
      roomId: new Types.ObjectId(roomId),
      $or: [
        {
          $and: [
            { startDate: { $lte: parsedStartDate } },
            { endDate: { $gte: parsedStartDate } },
          ],
        },
        {
          $and: [
            { startDate: { $lte: parsedEndDate } },
            { endDate: { $gte: parsedEndDate } },
          ],
        },
      ],
    }).session(session);

    if (overlappingReservations.length > 0) {
      throw new Error(
        "This Room has already been booked for one or more days in your selected period!"
      );
    }

    // Get sellerId from the room
    const room = await Rooms.findById(roomId).session(session);
    if (!room) {
      throw new Error("Room not found");
    }

    // CREATE RESERVATION DATA
    const reservationData = {
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      status: status || ReservationStatus.PENDING,
      totalPrice: Number(totalPrice),
      guests: Number(guests),
      userId: new Types.ObjectId(userId),
      roomId: new Types.ObjectId(roomId),
      sellerId: room.sellerId,
    };

    const [reservation] = await Reservations.create([reservationData], {
      session,
    });
    await session.commitTransaction();
    await session.endSession();
    return {
      success: false,
      message: "",
      data: reservation,
    };
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    await session.endSession();
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unkown error occurred. Please you can further reach out to the support team",
      data: null,
    };
  }
};

// Delete a reservation
const deleteReservation = async (reservationId: string) => {
  const reservation = await Reservations.findById(reservationId);
  if (!reservation) {
    throw new Error("The reservation does not exist");
  }

  // Delete associated payments
  await Payment.deleteMany({
    reservationId: new Types.ObjectId(reservationId),
  });

  // Delete reservation
  await Reservations.findByIdAndDelete(reservationId);

  return { msg: "The reservation has been successfully deleted" };
};

// Update a reservation
const updateReservation = async (
  reservationId: string,
  roomId: string,
  data: Partial<IReservation>
) => {
  const { startDate, endDate, status, totalPrice, guests } = data;

  // Parse and format dates
  const parsedStartDate = startDate ? new Date(startDate) : undefined;
  const parsedEndDate = endDate ? new Date(endDate) : undefined;

  // Find the existing reservation
  const reservation = await Reservations.findById(reservationId);
  if (!reservation) {
    throw new Error("The reservation does not exist");
  }

  // Find the next reservation to adjust endDate
  const nextReservation = await Reservations.findOne({
    roomId: new Types.ObjectId(roomId),
    startDate: { $gte: reservation.endDate },
  }).sort({ startDate: 1 });

  let finalEndDate = parsedEndDate;
  if (
    nextReservation &&
    parsedEndDate &&
    new Date(nextReservation.startDate) < parsedEndDate
  ) {
    finalEndDate = new Date(nextReservation.startDate);
  }

  // Check for overlapping reservations
  const overlappingReservations = await Reservations.find({
    roomId: new Types.ObjectId(roomId),
    _id: { $ne: new Types.ObjectId(reservationId) },
    $or: [
      {
        $and: [
          { startDate: { $lte: parsedStartDate } },
          { endDate: { $gte: parsedStartDate } },
        ],
      },
      {
        $and: [
          { startDate: { $lte: finalEndDate } },
          { endDate: { $gte: finalEndDate } },
        ],
      },
    ],
  });

  if (overlappingReservations.length > 0) {
    throw new Error(
      "This room is already booked for one or more days in your selected period."
    );
  }

  // Update reservation
  const updatedReservation = await Reservations.findByIdAndUpdate(
    reservationId,
    {
      $set: {
        startDate: parsedStartDate,
        endDate: finalEndDate,
        status,
        totalPrice: totalPrice ? Number(totalPrice) : undefined,
        guests: guests ? Number(guests) : undefined,
        // patchguests: patchguests ? Number(patchguests) : undefined,
        // partpaymentPrice: partpaymentPrice
        //   ? Number(partpaymentPrice)
        //   : undefined,
      },
    },
    { new: true, runValidators: true }
  );

  return updatedReservation;
};

export {
  getUserReservations,
  getSellerReservations,
  getSingleReservation,
  createUserReservation,
  deleteReservation,
  updateReservation,
};
