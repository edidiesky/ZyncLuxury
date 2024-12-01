import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from "@/features/room/roomReducer";
import { handleClearRoomAlert } from "@/features/room/roomSlice";
import Navbar from "../common/navbar";
import Filter from "./Filter";

const HomeIndex = () => {
  const dispatch = useDispatch();
  const { country, type } = useSelector((store) => store.room);
  useEffect(() => {
    dispatch(handleClearRoomAlert());
    dispatch(getAllRooms());
  }, [country, type]);
  return (
    <div className=" w-full flex flex-col">
      <Navbar />
      <div
        style={{
          height: "calc(100vh - 90px)",
        }}
        className="w-full flex flex-col relative gap-1"
      >
        <Filter />
      </div>
    </div>
  );
};

export default HomeIndex;
