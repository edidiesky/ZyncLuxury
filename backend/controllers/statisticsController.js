import asyncHandler from "express-async-handler";
import prisma from "../prisma/index.js";
import { startOfYear, endOfYear, format, addMonths } from "date-fns";
import moment from "moment";

// @description  Get the reservation bookings for the konth, their revenue, total payment, total bookings;
// @route  GET /stat
// @access  Private
const GetStatisticsDataForAdmin = asyncHandler(async (req, res) => {
  const start = performance.now();
  // destructure the value from the promises from the Prmoise.all
  const [
    totalOrderAmount,
    totalOrder,
    totalReservations,
    reservations,
    totalRooms,
    payment,
  ] = await Promise.all([
    // Aggregate total order amount
    prisma.payment.aggregate({
      _sum: {
        amount: true,
      },
    }),

    //  Count total orders
    prisma.payment.count({}),

    // Count total reservations
    prisma.reservations.count({
      where: {
        sellerId: req.user.userid,
      },
    }),
    // Get all the reservations of the seller where the status is confirmed
    await prisma.reservations.findMany({
      where: {
        sellerId: req.user.userid,
        status: "CONFIRMED",
      },
      orderBy: {
        createdAt: "asc",
      },
    }),

    // Get the seller room
    prisma.rooms.count({
      where: {
        sellerid: req.user.userid,
      },
    }),

    // Find payments, ordered by creation date
    prisma.payment.findMany({
      where: {
        sellerId: req.user.userid,
      },
      select: {
        createdAt: true,
        amount: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);
  const end = performance.now();
  // getting the total sales for the year
  const totalSales = reservations.reduce((acc, curr) => {
    acc += curr.totalPrice;
    return acc;
  }, 0);
  // getting the total successful Booked Reservations
  const groupedStats = reservations.reduce((acc, curr) => {
    const year = curr.createdAt.getFullYear();
    const month = curr.createdAt.getMonth() + 1;
    const key = `${month}-${year}`;
    // console.log(day);
    if (!acc[key]) {
      acc[key] = {
        year,
        month,
        count: 0,
        totalPrice: 0,
      };
    }

    acc[key].count += 1;
    acc[key].totalPrice += curr.totalPrice;

    return acc;
  }, {});

  const totalBookingsByMonth = Object.values(groupedStats).map((stat) => {
    const date = moment()
      .year(stat.year)
      .month(stat.month - 1)
      .format("MMM Y");
    return { date, reservationCount: stat.count, totalPrice: stat.totalPrice };
  });

  return res.json({
    totalSales,
    totalBookingsByMonth,
    totalReservations: totalReservations || 0,
    totalRooms: totalRooms || 0,
    latency: `Total Latency - ${(end - start) / 1000} seconds`,
  });
});

export { GetStatisticsDataForAdmin };
