import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getAdminStat } from "./statReducer";
const initialState = {
  totalOrderAmount: 0,
  totalOrder: 0,
  totalReservations: 0,
  totalRooms: 0,
  getStatisLoading: false,
  getStatisSuccess: false,
  getStatisError: false,
  totalMonth: [],
  totalYear: [],
  totalMonthBookings: [],
  totalMonthRevenue: [],
};

export const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getAdminStat
    builder.addCase(getAdminStat.pending, (state, action) => {
      state.getStatisLoading = true;
    });
    builder.addCase(getAdminStat.fulfilled, (state, action) => {
      state.getStatisLoading = false;
      state.totalRooms = action.payload.totalRooms;
      state.totalReservations = action.payload?.totalReservations;
      state.totalOrder = action.payload?.totalSales;
      state.totalOrderAmount = action.payload?.totalOrderAmount;
      state.totalMonth = action.payload?.totalBookingsByMonth.map(
        (data) => `${data?.date}`
      );
      state.totalMonthBookings = action.payload?.totalBookingsByMonth.map(
        (data) => data.reservationCount
      );
       state.totalMonthRevenue = action.payload?.totalBookingsByMonth.map(
         (data) => Number(data.totalPrice)
       );
    });
    builder.addCase(getAdminStat.rejected, (state, action) => {
      state.getStatisLoading = false;
      toast.error(action.payload);
    });
  },
});

export default statSlice.reducer;
