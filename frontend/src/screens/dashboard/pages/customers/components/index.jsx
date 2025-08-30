 
import React, { useState } from "react";
import UserList from "./customerlist";
const DashboardIndex = () => {
  return (
    <div className="w-full">
      <div className="w-full pb-20 flex flex-col gap-4">
        <UserList />
      </div>
    </div>
  );
};

export default DashboardIndex;
