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
      <div className="w-full pb-20 flex flex-col gap-8 lg:gap-16 ">
        <div className="w-full grid lg:grid-cols-2 lg:items-center gap-8 lg:gap-16 justify-between">
          <div className="w-full flex flex-col gap-1">
            <h3 className="text-2xl block lg:text-4xl text-dark family2">
              Listings Created
            </h3>
            <span className="block family1 text-base lg:text-lg font-normal">
              Overview of your properties regarding your Listings created
            </span>
          </div>
          <div className="flex items-center lg:justify-end gap-2">
            <Link
              to={`/become-a-host/${currentUser?.id}`}
              className="btn text-center md:block hidden text-sm md:text-base regular text-white px-4 md:px-8 py-3"
            >
              Host your Home
            </Link>
          </div>
        </div>
        <RoomsList />
      </div>
    </div>
  );
};

export default DashboardIndex;
