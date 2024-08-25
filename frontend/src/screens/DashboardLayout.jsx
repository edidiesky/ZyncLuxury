import { Outlet } from "react-router-dom";
import React from "react";
import DashboardSidebar from "@/components/common/DashboardSidebar";
import DashboardHeader from "@/components/common/dashboardHeader";
const DashboardLayout = () => {
  return (
    <>
      <div 
      style={{fontFamily:"Work Sans, Arial, Helvetica, sans-serif"}}
      className="w-full relative flex justify-end">
        <DashboardSidebar />
        <div className="flex w-full lg:w-[95%] flex-col gap-4">
          <DashboardHeader />
          <div className="px-4 py-8 lg:px-6 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
