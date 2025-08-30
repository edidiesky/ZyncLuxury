import React, { useState } from "react";
import OrderList from "./orderlist";
const DashboardIndex = () => {
  return (
    <div className="w-full min-h-[100vh]">
      <div className="w-full pb-20 flex flex-col gap-4">
        <OrderList />
      </div>
    </div>
  );
};

export default DashboardIndex;
