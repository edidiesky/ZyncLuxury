"use client";
import React, { useEffect } from "react";
import { BiCheck, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { apartmentDataList } from "../../../data/apartmentData";
import RoomCard from "../../common/RoomCard";
import { getAllRooms } from "@/features/room/roomReducer";
import Loader from "@/components/home/loader";
const MainContent = () => {
  return (
    <div className="w-full relative min-h-[100vh] flex flex-col gap-8">
      {/* <Hero /> */}
      <RoomLists />
    </div>
  );
};

const Hero = () => {
  return (
    <div
      className="w-full relative pt-20 flex items-center justify-center
   gap-8"
    >
      <div className="w-[90%] max-w-custom mx-auto z-40 flex items-center gap-16 justify-center flex-col">
        <h1 className="text-[#000] font-bold md:text-center leading-[1] text-5xl md:text-6xl font-booking_font4">
          Best <span className="text-[var(--primary)]">Properites</span> of the Year
          <span className="block font-normal py-4 text-lg text-grey">
            Here is a list of our room collections
          </span>
        </h1>
        <div className="flex w-full flex-col gap-6">
          <h1 className="text-[#000] font-semibold leading-[1.3] text-2xl md:text-3xl font-booking_font4">
            Rent an Apartment
          </h1>
          <div className="w-full bg-[#fafafa] flex flex-col py-12 rounded-xl">
            <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col gap-2 text-base font-semibold">
                Type of Property
                <div className="w-full p-6 bg-white"></div>
              </div>

              <div className="flex flex-col gap-2 text-base font-semibold">
                Rate for all per month
                <div className="w-full p-6 bg-white"></div>
              </div>

              <div className="flex flex-col gap-2 text-base font-semibold">
                Area
                <div className="w-full p-6 bg-white"></div>
              </div>

              <div className="flex flex-col gap-2 text-base font-semibold">
                Location
                <div className="w-full p-6 bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoomLists = () => {
  const dispatch = useDispatch();
  const { rooms, getallRoomisLoading } = useSelector((store) => store.room);

  useEffect(() => {
    dispatch(getAllRooms());
  }, []);
  return (
    <div
      className="w-full relative py-16 flex items-center justify-center
   gap-8"
    >
      <div
        className="w-[90%] relative mx-auto max-w-custom_1 z-40 items-start lg:justify-center flex-col
       gap-12"
      >
        {getallRoomisLoading ? (
          <Loader />
        ) : (
          <div className=" gap-8 w-full grid md:grid-cols-2 lg:grid-cols-3">
            {rooms?.map((apartment, index) => {
              return <RoomCard key={index} apartment={apartment} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent;
