"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllRoomAndReservations } from "@/features/reservation/reservationReducer";

import { motion, useInView, AnimatePresence } from "framer-motion";
import ReservationRoomsModal from "@/components/modals/ReservationRoomsModal";
import ReservationCalendar from "./Calendar";
import Loader from "@/components/home/loader";
import CreateReservationModal from "@/components/modals/reservationmodal/CreateReservationModal";
const DashboardIndex = () => {
  const [reservationmodal, setReservationModal] = useState(false);
  const [createreservationmodal, setCreateReservationModal] = useState(false);
  const [roommodal, setRoomModal] = useState(false);
  const dispatch = useDispatch();
  const { reservations, getsingleReservationisLoading } = useSelector(
    (store) => store.reservation
  );

  const { currentUser } = useSelector(
    (store) => store.auth
  );


  useEffect(() => {
    dispatch(GetAllRoomAndReservations());
  }, []);
  if (getsingleReservationisLoading) {
    return <Loader />
  }
  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {reservationmodal && (
          <ReservationRoomsModal
            modal={reservationmodal}
            setModal={setReservationModal}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {createreservationmodal && (
          <CreateReservationModal
            modal={createreservationmodal}
            setModal={setCreateReservationModal}
          />
        )}
      </AnimatePresence>
      <div className="w-full relative flex flex-col gap-8">
        <div className="w-full grid md:grid-cols-2 lg:items-center gap-4 justify-between">
          <h2 className="text-4xl font-booking_font4 font-bold">
            Dashboard
            <span className="text-sm block text-dark font-booking_font_bold font-semibold family1">
              <span className="font-normal font-booking_font text-sm text-dark">
                Welcome back,
              </span>{" "}
              {currentUser?.name}
            </span>
          </h2>
          <div className="flex items-center md:justify-end gap-2">
            <div
              onClick={() => setCreateReservationModal(true)}
              className="p-4 btn cursor-pointer text-sm
             bg-[#000] px-6 font-booking_font rounded-[10px] font-semibold text-white"
            >
              Add a reservation
            </div>
          </div>
        </div>
        <ReservationCalendar />
      </div>
    </div>
  );
};

export default DashboardIndex;
