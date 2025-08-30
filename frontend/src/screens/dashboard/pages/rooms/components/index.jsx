import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ReservationRoomsModal from "@/components/modals/ReservationRoomsModal";
import RoomsList from "./rooms";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoomsForAdmin } from "@/features/room/roomReducer";
import Widget from "@/screens/dashboard/components/widget/MainWidget";
const DashboardIndex = () => {
  const [roommodal, setRoomModal] = useState(false);
  const { deleteRoomisSuccess, page } = useSelector((store) => store.room);
  const { currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRoomsForAdmin());
  }, [page]);
  const stats = [
    {
      title: "Total Rooms",
      value: 100,
      change: "+1.3%",
      period: "from last week",
    },
    {
      title: "Villa Rooms",
      value: 30,
      change: "+1.4%",
      period: "from last week",
    },
    {
      title: "Stay Rooms",
      value: 40,

      change: "1%",
      period: "from last week",
    },
    {
      title: "Hotels Rooms",
      value: 10,
      change: "1%",
      period: "from last week",
    },
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        {roommodal && (
          <ReservationRoomsModal modal={roommodal} setModal={setRoomModal} />
        )}
      </AnimatePresence>
      <div className="w-full flex flex-col gap-8">
        <Widget loading={false} data={stats} />
        <RoomsList />
      </div>
    </>
  );
};

export default DashboardIndex;
