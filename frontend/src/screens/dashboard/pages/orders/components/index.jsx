 
import React, { useState } from "react";
import RoomsList from "./orderlist";
const DashboardIndex = () => {
  const [roommodal, setRoomModal] = useState(false);
  return (
    <div className="w-full min-h-[100vh]">
      <div className="w-full pb-20 flex flex-col gap-4">
        <div className="w-full grid lg:grid-cols-2 lg:items-center gap-4 justify-between">
          <div className="w-full flex flex-col gap-1">
            <h3 className="text-2xl block lg:text-4xl text-dark family2">
              Transactions List
            </h3>
            <span className="block family1 text-base font-normal">
              Make a review of your customers either by adding or modifying
              their content
            </span>
          </div>
        </div>
        <RoomsList />
      </div>
    </div>
  );
};

export default DashboardIndex;
