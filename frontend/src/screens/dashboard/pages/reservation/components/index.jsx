"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllRoomAndReservations,
  GetAllReservations,
} from "@/features/reservation/reservationReducer";

import { motion, useInView, AnimatePresence } from "framer-motion";
import ReservationRoomsModal from "@/components/modals/ReservationRoomsModal";
import ReservationCalendar from "./Calendar";
import Loader from "@/components/home/loader";
import CreateReservationModal from "@/components/modals/reservationmodal/CreateReservationModal";
import Nav from "@/components/common/Nav";
import { Table } from "@/components/common/styles";
import TableCard from "@/components/common/TableCard";
const DashboardIndex = () => {
  const [reservationmodal, setReservationModal] = useState(false);
  const [createreservationmodal, setCreateReservationModal] = useState(false);
  const [roommodal, setRoomModal] = useState(false);
  const dispatch = useDispatch();
  const { reservations, getsingleReservationisLoading } = useSelector(
    (store) => store.reservation
  );

  const { currentUser } = useSelector((store) => store.auth);

  useEffect(() => {
    // dispatch(GetAllRoomAndReservations());
    dispatch(GetAllReservations());
  }, []);
  if (getsingleReservationisLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full flex flex-col gap-12">
      {/* <AnimatePresence mode="wait">
        {reservationmodal && (
          <ReservationRoomsModal
            modal={reservationmodal}
            setModal={setReservationModal}
          />
        )}
      </AnimatePresence> */}

      <AnimatePresence mode="wait">
        {createreservationmodal && (
          <CreateReservationModal
            modal={createreservationmodal}
            setModal={setCreateReservationModal}
          />
        )}
      </AnimatePresence>
      <div className="w-full grid md:grid-cols-2 lg:items-center gap-4 justify-between">
        <h3 className="text-3xl lg:text-5xl font-bold family1">
          Reservations
          <span className="block pt-3 text-base max-w-[400px] font-normal family1">
            Make a review of your reservations created by your clients
          </span>
        </h3>
        <div className="flex items-center md:justify-end gap-2">
          <div
            onClick={() => setCreateReservationModal(true)}
            className="p-4 btn btn_2 cursor-pointer text-sm
             bg-[#000] px-6 font-booking_font rounded-[10px] font-semibold text-white"
          >
            Add a reservation
          </div>
        </div>
      </div>
      <div className="w-full bg-[#FAFAFA] min-h-[170px] items-center flex flex-col p-4 px-6 rounded-3xl">
        <Table>
          <div className="TableContainer">
            <table className="tableWrapper">
              <thead>
                <tr>
                  {/* <th>Description</th> */}
                  <th>Home Title</th>
                  <th className="hidden lg:table-cell">User</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {reservations?.map((x, index) => {
                  return (
                    <TableCard
                      handleModal={() => {
                        setCreateReservationModal(true);
                      }}
                      x={x}
                      type={"Reservation"}
                      key={x?.id}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </Table>

        {/* <ReservationCalendar /> */}
      </div>
    </div>
  );
};

export default DashboardIndex;
