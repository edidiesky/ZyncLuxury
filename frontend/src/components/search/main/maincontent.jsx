"use client";
import React, { useEffect } from "react";
import { BiCheck, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { apartmentDataList } from "../../../data/apartmentData";
import RoomCard from "../../common/RoomCard";
import { getAllRooms } from "@/features/room/roomReducer";
import Loader from "@/components/home/loader";
import Map from "../Map";
import Skeleton from "react-loading-skeleton";
const MainContent = () => {
  return (
    <div className="w-full relative h-full flex flex-col gap-8">
      <RoomLists />
    </div>
  );
};

const RoomLists = () => {
  const { rooms, getallRoomisLoading, totalRooms } = useSelector(
    (store) => store.room
  );

  return (
    <div
      className="w-[100%] mx-auto max-w-custom h-full z-40 relative 
    grid grid-cols-custom items-start"
    >
      <div className="w-full py-8 h-full  shadow-lg bg-[#fff]">
        <div
          className="w-full relative flex px-4 md:px-8 flex-col
       gap-4"
        >
          <h4 className="text-xl md:text-2xl family2">
            Over {totalRooms} property
          </h4>

          <div
            className="w-[100%] relative 
            mx-auto max-w-custom_1 z-40 items-start lg:justify-center flex-col
       gap-12"
          >
            {getallRoomisLoading ? (
              <div className=" gap-8 w-full grid md:grid-cols-2 lg:grid-cols-3">
                {new Array(12)?.fill("")?.map((apartment, index) => {
                  return (
                    <div key={index} className="w-full">
                      <Skeleton key={index} width={"100%"} height={200} />
                      <div className="bg-white w-full grid">
                        <Skeleton key={index} width={"40%"} height={5} />
                        <Skeleton key={index} width={"80%"} height={10} />
                        <Skeleton key={index} width={"50%"} height={5} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className=" gap-x-2 gap-y-8 w-full grid md:grid-cols-2 lg:grid-cols-3">
                {rooms?.slice(0, 12).map((apartment, index) => {
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
      <div className="w-full md:w-[450px] h-full flex justify-center
      items-center sticky top-0">
        {getallRoomisLoading ? <Loader type="dots" color={"#000"} size={'60'} /> : <Map />}
      </div>
    </div>
  );
};

export default MainContent;
