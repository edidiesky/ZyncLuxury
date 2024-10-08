import React, { useEffect } from "react";
import MainContent from "./main/maincontent";
import Footer from "../common/Footer";
import Header, { FilterRooms } from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from "@/features/room/roomReducer";
import { handleClearRoomAlert } from "@/features/room/roomSlice";

const HomeIndex = () => {
   const dispatch = useDispatch();
   const { country,type } = useSelector((store) => store.room);
    useEffect(() => {
      dispatch(handleClearRoomAlert());
      dispatch(getAllRooms());
    }, [country, type]);
  return (
    <div className="bg-[var(--light-grey)] h-[100vh] w-full flex flex-col">
      {/* <Navbar /> */}
      <div className="w-full z-[50000]">
        <Header />
      </div>
      <div
        style={{
          height: "calc(100vh - 90px)",
        }}
        className="w-full flex flex-col relative gap-1"
      >
        <FilterRooms />
        <MainContent />
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default HomeIndex;
