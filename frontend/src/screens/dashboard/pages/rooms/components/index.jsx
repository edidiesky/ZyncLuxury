 
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
      <div className="w-full pb-20 flex flex-col gap-6">
        <div className="w-full grid lg:grid-cols-2 lg:items-center gap-6 justify-between">
          <div className="w-full flex flex-col gap-1">
            <h3 className="text-2xl block lg:text-4xl text-dark family2">
              Listings Created
            </h3>
            <span className="block family1 text-base font-normal">
              Overview of your properties regarding your Listings created
            </span>
          </div>
          <div className="flex items-center lg:justify-end gap-2">
            <Link
              to={"/dashboard/rooms/create-room"}
              className="p-3 btn cursor-pointer text-sm px-8 font-bold 
             rounded-[10px]  text-white"
            >
              Add a room
            </Link>
          </div>
        </div>
        <RoomsList />
      </div>
    </div>
  );
};

export default DashboardIndex;
