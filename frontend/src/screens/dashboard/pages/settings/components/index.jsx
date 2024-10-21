"use client";
import React, { useState } from "react";
import Profile from "./profile"
const DashboardIndex = () => {
  const [roommodal, setRoomModal] = useState(false);
  return (
    <div className="w-full">
      <div className="w-full pb-20 flex flex-col gap-6">
        <div className="w-full flex flex-col gap-1">
          <h3 className="text-2xl block lg:text-4xl text-dark family2">
            Account Settings
          </h3>
          <span className="block family1 text-base font-normal">
            Make a review of your customers by Making changes on their profile
          </span>
        </div>
        <Profile />
      </div>
    </div>
  );
};

export default DashboardIndex;
