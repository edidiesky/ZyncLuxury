import { configureStore } from "@reduxjs/toolkit";
import roomSlice from "./features/room/roomSlice";
import modalSlice from "./features/modals/modalSlice";
import authSlice from "./features/auth/authSlice";
import reservationSlice from "./features/reservation/reservationSlice";
import paymentSlice from "./features/payment/paymentSlice";
import statSlice from "./features/stat/statSlice";
import favouritesSlice from "./features/favourites/favouritesSlice";
import notificationSlice from "./features/notification/notificationSlice";
import messageSlice from "./features/message/messageSlice";
import conversationSlice from "./features/conversation/conversationSlice";
export const store = configureStore({
  reducer: {
    room: roomSlice,
    modal: modalSlice,
    auth: authSlice,
    reservation: reservationSlice,
    payment: paymentSlice,
    stat: statSlice,
    favourites: favouritesSlice,
    notification: notificationSlice,
    conversation: conversationSlice,
    message: messageSlice,
  },
});
