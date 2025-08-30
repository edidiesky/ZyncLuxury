import { Outlet } from "react-router-dom";
import React from "react";
import DashboardSidebar from "@/components/common/DashboardSidebar";
import DashboardHeader from "@/components/common/dashboardHeader";
const DashboardLayout = () => {
  return (
    <>
      <div
        className="w-full dashboard-font bg-[#fff] relative flex items-start justify-end"
      >
        <DashboardSidebar />
        <div className="flex w-full relative flex-col gap-4">
          <DashboardHeader />
          <div className="px-4 py-8 mx-auto max-w-custom  lg:px-8 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
