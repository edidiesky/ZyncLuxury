import { useSelector } from "react-redux";
import RoomCard from "../common/RoomCard";
import CardLoader from "@/components/common/CardLoader";
import AnimateTextWord from "../common/AnimateTextWord";
import React, { useState } from "react";

const Filter = () => {
  const { rooms, getallRoomisLoading, totalRooms } = useSelector(
    (store) => store.room
  );
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    minPrice: "",
    maxPrice: "",
    title: "",
    limit: "",
    page: "",
    type: "",
    country: "",
  });
  // debounced valued
  // carry out a side-effect
  // handle filterChange
  // 
  return (
    <div className="w-[100%] mx-auto max-w-custom py-20 z-40 relative grid grid-cols-1 items-start">
      <div
        className="w-[95%] lg:w-[90%] max-w-custom mx-auto relative flex px-4 flex-col
       gap-4 lg:gap-16"
      >
        <h4 className="text-4xl capitalize max-w-[780px] md:text-5xl family2 text-[var(--dark-1)]">
          <AnimateTextWord type={"bigtext"}>
            Search our Highly curated Listings made for your Next Adventure
          </AnimateTextWord>
        </h4>

        <div className="w-[100%] relative z-40 flex-col gap-12">
          {getallRoomisLoading ? (
            <div className="gap-8 w-full grid md:grid-cols-2 lg:grid-cols-3">
              {new Array(12)?.fill("")?.map((_, index) => {
                return <CardLoader key={index} />;
              })}
            </div>
          ) : (
            <div className="gap-x-8 gap-y-16 w-full grid md:grid-cols-2 lg:grid-cols-3">
              {rooms?.map((apartment, index) => {
                return <RoomCard key={index} apartment={apartment} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
