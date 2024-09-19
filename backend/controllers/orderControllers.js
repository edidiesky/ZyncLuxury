// import Product from "../models/Product.js";
import dotenv from "dotenv";
dotenv.config();
import prisma from "../prisma/index.js";
import expressAsyncHandler from "express-async-handler";

// @description  Create a payment for the separate user
// @route  POST /order
// @access  Public
const CreatePayment = expressAsyncHandler(async (req, res) => {
  // instantiate the form data from the request body
  const { userId } = req.user;
  const { reservationid, amount, currency, guests, sellerId } = req.body;

  // create payment history for the user
  const payment = await prisma.payment.create({
    data: {
      amount,
      currency,
      user: {
        connect: { id: userId },
      },
      seller: {
        connect: { id: sellerId },
      },
      Reservation: {
        connect: { id: reservationid },
      },
      guests: guests,
    },
  });

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ payment });
});


// @description  Get a seller order
// @route  GET /order/history
// @access  Private
const GetPaymentHistoryForAdmin = expressAsyncHandler(async (req, res) => {
  // instantiate the form data from the request body
  const payment = await prisma.payment.findMany({
    include: {
      user: true,
      Reservation: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ payment });
});


// @description  Get a single payment details
// @route  GET /order/history/46484489
// @access  Public
const GetSinglePaymentDetails = expressAsyncHandler(async (req, res) => {
  // instantiate the form data from the request body

  const payment = await prisma.payment.findUnique({
    where: {
      id: req.params.id,
      userid: req.user?.userId,
    },
    include: {
      user: true,
      reservation: true,
    },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ payment });
});


// @description  Update a single payment details to failed when the flutterWave payment is not complete
// @route  PUT /order/history/failed/46484489
// @access  Public
const UpdatePaymentToFailed = expressAsyncHandler(async (req, res) => {
  // instantiate the form data from the request body
  const { userId } = req.body;
  const payment = await prisma.payment.update({
    where: {
      id: req.params.id,
    },
    data: {
      status: "CANCELLED",
    },
    include: {
      user: true,
      reservation: true,
    },
  });
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");

  res.status(200).json({ payment });
});

// @description  Update a single payment details to success when the flutterWave payment is completed
// @route  PUT /order/history/success/46484489
// @access  Public
const UpdatePaymentToSuccess = expressAsyncHandler(async (req, res) => {
  const { reservationid, amount, currency } = req.body;
  const paymentId = req.params.id;

  // Update the payment status to "CONFIRMED"
  const payment = await prisma.payment.update({
    where: { id: paymentId },
    data: { status: "CONFIRMED" },
    include: {
      user: true,
    },
  });

  // Find the reservation
  const reservation = await prisma.reservations.findFirst({
    where: {
      userid: req.user.userId,
      id: reservationid,
    },
  });

  if (reservation) {
    // Update the reservation status using the unique `id`
    const updatedReservation = await prisma.reservations.update({
      where: { id: reservation.id },
      data: { status: "CONFIRMED" },
      include: {
        rooms: true,
      },
    });

    res.status(200).json({ payment, updatedReservation });
  } else {
    res.status(404).json({ message: "Reservation not found" });
  }
});

export {
  CreatePayment,
  GetPaymentHistoryForAdmin,
  UpdatePaymentToFailed,
  GetSinglePaymentDetails,
  UpdatePaymentToSuccess,
};
