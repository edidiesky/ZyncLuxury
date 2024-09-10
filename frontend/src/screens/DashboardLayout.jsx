import { Outlet } from "react-router-dom";
import React from "react";
import DashboardSidebar from "@/components/common/DashboardSidebar";
import DashboardHeader from "@/components/common/dashboardHeader";
const DashboardLayout = () => {
  return (
    <>
      <div
        style={{
          backdropFilter: "blur(54px)",
        }}
        className="w-full px-8 bg-[#fff] relative flex items-start gap-4 p-6 justify-end"
      >
        <DashboardSidebar />
        <div className="flex w-full md:w-[95%] overflow-hidden flex-col gap-4">
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
