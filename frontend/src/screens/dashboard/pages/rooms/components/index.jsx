import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ReservationRoomsModal from "@/components/modals/ReservationRoomsModal";
import RoomsList from "./rooms";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoomsForAdmin } from "@/features/room/roomReducer";
const DashboardIndex = () => {
  const [roommodal, setRoomModal] = useState(false);
  const { deleteRoomisSuccess, page } = useSelector((store) => store.room);
  const { currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRoomsForAdmin());
  }, [page]);
  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {roommodal && (
          <ReservationRoomsModal modal={roommodal} setModal={setRoomModal} />
        )}
      </AnimatePresence>
      <RoomsList />
    </div>
  );
};

export default DashboardIndex;
