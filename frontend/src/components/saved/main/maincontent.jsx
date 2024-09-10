"use client";
import React from "react";
import RoomCard from "../../common/RoomCard";
import { useSelector } from "react-redux";
import Loader from "@/components/home/loader";
import { Link } from "react-router-dom";
const MainContent = () => {
  return (
    <div className="w-full relative flex flex-col">
      <RoomLists />
    </div>
  );
};

const RoomLists = () => {
  const { savedRooms, wishisLoading } = useSelector(
    (store) => store.favourites
  );
  return (
    <div
      className="w-full relative py-24 flex items-center justify-center
   gap-8"
    >
      {wishisLoading && <Loader />}
      <div className="w-[95%] max-w-custom_1 relative mx-auto flex flex-col gap-12">
        {savedRooms?.length === 0 ? (
          <h1 className="text-dark text-start leading-[1.3] text-3xl md:text-4xl font-booking_font4 font-bold">
            You have an empty Saved Rooms
            <Link
              to={"/search"}
              style={{ letterSpacing: "4px" }}
              className="text-[9px] md:text-xs font-normal pb-1 pt-3 w-fit border-b border-[rgba(0,0,0,.5)] uppercase flex items-center gap-4 font-booking_font"
            >
              Visit our rooms collections
            </Link>
          </h1>
        ) : (
          <h3 className="text-4xl md:text-5xl font-bold">
            Saved Homes
            <span className="block pt-3 font-normal text-base md:text-xl">
              Here is your list of your luxurious saved homes
            </span>
          </h3>
        )}

        <div
          className="w-full z-40 flex items-start justify-center flex-col
       gap-12"
        >
          <div className="w-full">
            {savedRooms?.length === 0 ? (
              ""
            ) : (
              <div className=" gap-8 w-full grid md:grid-cols-2 lg:grid-cols-3">
                {savedRooms?.map((apartment, index) => {
                  return (
                    <RoomCard
                      type={"Search"}
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
    </div>
  );
};

export default MainContent;
