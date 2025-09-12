import { useSelector } from "react-redux";
import RoomCard from "../common/RoomCard";
import CardLoader from "@/components/common/CardLoader";
import AnimateTextWord from "../common/AnimateTextWord";
import React, { useState, useEffect } from "react";
import FilterInputs from "./FilterInputs";

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
  const [debouncedfilters, setDebouncedFilters] = useState(filters);
  // carry out a side-effect
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedFilters(filters), 1000);
    return () => clearTimeout(timer);
  }, [filters]);
  // handle filterChange
  const handlefilterChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const params = new URLSearchParams(debouncedfilters).toString();
  // console.log("params",params);
  return (
    <div className="w-[100%] mx-auto max-w-custom py-20 z-40 relative grid grid-cols-1 items-start">
      <div
        className="max-w-custom mx-auto relative flex px-4 flex-col
       gap-12 lg:gap-16"
      >
        <div className="w-full relative flex flex-col gap-6 lg:gap-8">
          <h4 className="text-4xl capitalize max-w-[780px] lg:text-5xl family2 text-[var(--dark-1)]">
            <AnimateTextWord type={"bigtext"}>
              Search our Highly curated Listings made for your Next Adventure
            </AnimateTextWord>
          </h4>
          <FilterInputs
            filters={filters}
            handlefilterChange={handlefilterChange}
          />
        </div>

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
                return (
                  <RoomCard key={index} index={index} apartment={apartment} />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
