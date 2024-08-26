"use client";
import React from "react";
import { BiCheck, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { apartmentDataList } from "../../../data/apartmentData";
import RoomCard from "../../common/RoomCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
const MainContent = () => {
  return (
    <div className="w-full relative flex flex-col">
      <RoomLists />
    </div>
  );
};


const RoomLists = () => {
  const { reservations, getsingleReservationisLoading } = useSelector((store) => store.reservation);
  return (
    <div
      className="w-full relative py-20 pb-12 flex items-center justify-center
   gap-8"
    >
      <div className="w-[90%] md:w-[80%] max-w-custom_1 relative mx-auto flex flex-col gap-12">
        {reservations?.length === 0 ? (
          <h3 className="text-dark text-start leading-[1.3] text-4xl md:text-5xl font-bold font-booking_font4">
            You have an empty Trips
            <Link
              to={"/search"}
              style={{ letterSpacing: "4px" }}
              className="text-[9px] md:text-xs font-normal pb-1 pt-3 w-fit border-b border-[rgba(0,0,0,.5)] uppercase flex items-center gap-4 font-booking_font"
            >
              Visit our rooms collections
            </Link>
          </h3>
        ) : (
          <h3 className="text-4xl md:text-5xl font-bold">
            My Reservations
            <span className="block pt-3 font-normal text-base md:text-xl">
              Here is your list of your luxurious booked homes
            </span>
          </h3>
        )}

        <div
          className="w-full  z-40 items-start justify-center flex-col
       gap-12"
        >
          {getsingleReservationisLoading ? (
            <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array(8)
                .fill("")
                .map((x, index) => {
                  return (
                    <div className="w-full flex flex-col gap-3">
                      <Skeleton width={"100%"} height={240} />
                      <div className="flex w-full gap-[2px] flex-col">
                        <Skeleton width={"80%"} height={20} />
                        <div className="flex w-full flex-col">
                          <Skeleton width={"60%"} height={6} />
                          <Skeleton width={"30%"} height={6} />
                        </div>
                        {/* <div className="flex w-full items-center justify-between">
                        <Skeleton width={"60%"} height={10} />
                        <Skeleton width={"30%"} height={10} />
                      </div> */}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="w-full">
              {reservations?.length === 0 ? (
                ""
              ) : (
                <div className="w-full gap-8 grid sm:grid-cols-2 lg:grid-cols-3">
                  {reservations?.map((apartment, index) => {
                    return (
                      <RoomCard
                        type={"trips"}
                        key={index}
                        apartment={apartment}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
