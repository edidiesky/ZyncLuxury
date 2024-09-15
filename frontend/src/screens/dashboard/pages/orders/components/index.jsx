"use client";
import React, { useState } from "react";
import RoomsList from "./orderlist";
const DashboardIndex = () => {
  const [roommodal, setRoomModal] = useState(false);
  return (
    <div className="w-full min-h-[100vh]">
      <div className="w-full pb-20 flex flex-col gap-12">
        <div className="w-full grid lg:grid-cols-2 lg:items-center gap-4 justify-between">
          <h3 className="text-3xl lg:text-5xl font-bold family1">
            Transactions List
            <span className="block pt-3 text-base max-w-[400px] font-normal family1">
              {" "}
              Make a review of your customers either by adding or modifying
              their content
            </span>
          </h3>
        </div>
        <RoomsList />
      </div>
    </div>
  );
};

export default DashboardIndex;
