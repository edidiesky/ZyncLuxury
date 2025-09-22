import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
  savedRooms: [],
  loginmodal: false,
  registermodal: false,
  listingmodal: false,
  paymentmodal: false,
  ordermodal: false,
  reservationmodal: false,
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    onLoginModal: (state, action) => {
      state.loginmodal = true;
    },
    offLoginModal: (state, action) => {
      state.loginmodal = false;
    },

    onRegisterModal: (state, action) => {
      state.registermodal = true;
    },
    offRegisterModal: (state, action) => {
      state.registermodal = false;
    },

    onListingModal: (state, action) => {
      state.listingmodal = true;
    },
    offListingModal: (state, action) => {
      state.listingmodal = false;
    },

    onPaymentModal: (state, action) => {
      state.paymentmodal = true;
    },
    offPaymentModal: (state, action) => {
      state.paymentmodal = false;
    },

    onReservationModal: (state, action) => {
      state.reservationmodal = true;
    },
    offReservationModal: (state, action) => {
      state.reservationmodal = false;
    },
  },
});

export const {
  onLoginModal,
  offLoginModal,
  onRegisterModal,
  offRegisterModal,
  onListingModal,
  offListingModal,
  onPaymentModal,
  offPaymentModal,
  onReservationModal,
  offReservationModal,
} = modalSlice.actions;

export default modalSlice.reducer;
