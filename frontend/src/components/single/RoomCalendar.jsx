import React from "react";
import moment from "moment";
import DateInput from "../forms/date";
import { useSelector } from "react-redux";
const RoomCalendar = ({ dateRange, handleSelect, differenceinDays }) => {
  const { room } = useSelector((store) => store.room);
  const startDate = moment(dateRange.selection.startDate).format("MMM D YYYY");
  const endDate = moment(dateRange.selection.endDate).format("MMM D YYYY");

  return (
    <div className="flex pt-8 md:pt-12 border-t flex-col w-full gap-4">
      <h3 className="text-xl md:text-2xl font-semibold">
        {differenceinDays ? differenceinDays : 0} night in {room?.title}
        <span
          className="block text-grey font-normal text-base family1"
        >
          <span>{startDate}</span> - <span>{endDate}</span>
        </span>
      </h3>
      <DateInput handleSelect={handleSelect} dateRange={dateRange} />
    </div>
  );
};

export default RoomCalendar;
