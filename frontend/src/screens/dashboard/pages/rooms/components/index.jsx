import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ReservationRoomsModal from "@/components/modals/ReservationRoomsModal";
import RoomsList from "./rooms";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRoomsForAdmin,
  getAllSellersListingsStats,
} from "@/features/room/roomReducer";
import Widget from "@/screens/dashboard/components/widget/MainWidget";
const DashboardIndex = () => {
  const [roommodal, setRoomModal] = useState(false);
  const {
    deleteRoomisSuccess,
    page,
    stats: sellerStats,
  } = useSelector((store) => store.room);
  const { currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRoomsForAdmin());
    dispatch(getAllSellersListingsStats());
  }, [page]);
  const stats = [
    {
      title: "Total Rooms",
      value: sellerStats?.totalListings,
      change: "+1.3%",
      period: "from last week",
    },
    {
      title: "Apartment Rooms",
      value: sellerStats?.apartment,
      change: "+1.4%",
      period: "from last week",
    },
    {
      title: "Stay Rooms",
      value: sellerStats?.stay,

      change: "1%",
      period: "from last week",
    },
    {
      title: "Hotels Rooms",
      value: sellerStats?.hotel,
      change: "1%",
      period: "from last week",
    },
  ];

  console.log("sellerStats:", sellerStats);
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
