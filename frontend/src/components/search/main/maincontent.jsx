"use client";
import React, { useEffect } from "react";
import { BiCheck, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { apartmentDataList } from "../../../data/apartmentData";
import RoomCard from "../../common/RoomCard";
import { getAllRooms } from "@/features/room/roomReducer";
import Loader from "@/components/home/loader";
import Map from "../Map";
const MainContent = () => {
  return (
    <div className="w-full relative h-full flex flex-col gap-8">
      <RoomLists />
    </div>
  );
};

const RoomLists = () => {
  const { rooms, getallRoomisLoading } = useSelector((store) => store.room);

  return (
    <div className="w-[100%] mx-auto max-w-custom_1 h-full z-40 relative grid grid-cols-custom_2">
      <div className="w-full py-12 h-full md:w-[650px] shadow-lg bg-[#fff]">
        <div
          className="w-full relative flex px-4 md:px-8 flex-col
       gap-12"
        >
          <h4 className="text-xl md:text-2xl font-semibold">
            New York Home for Sales
            <span className="block pt-3 text-lg text-grey font-normal">
              {" "}
              Over 40 Stays in Philadehlpia
            </span>
          </h4>

          <div
            className="w-[100%] max-h-[800px] overflow-auto relative 
            mx-auto max-w-custom_1 z-40 items-start lg:justify-center flex-col
       gap-12"
          >
            {getallRoomisLoading ? (
              <Loader />
            ) : (
              <div className=" gap-8 w-full grid md:grid-cols-2 lg:grid-cols-2">
                {rooms?.slice(0, 4).map((apartment, index) => {
                  return (
                    <RoomCard
                      type={"search"}
                      key={index}
                      apartment={apartment}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-full">
        <Map />
      </div>
    </div>
  );
};

export default MainContent;
