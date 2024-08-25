import React, { useEffect } from "react";
import Widget from "./widget";
import ReservationList from "./ReservationList";
import Statistics, { SalesStat } from "./statistics";
import { useSelector, useDispatch } from "react-redux";
import { getAdminStat } from "@/features/stat/statReducer";
import Loader from "@/components/home/loader";
import { GetAllUsers } from "@/features/auth/authReducer";
const DashboardIndex = () => {
  const { currentUser } = useSelector((store) => store.auth);
  const { getStatisLoading } = useSelector((store) => store.stat);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminStat());
    dispatch(GetAllUsers());
  }, []);
  if (getStatisLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-8">
        <h2 className="text-4xl font-bold font-booking_font4">
          Dashboard
          <span className="flex text-base font-normal text-[#777]">
            ZyncLuxury / Overview
          </span>
        </h2>
        <div className="w-full grid gap-8 md:grid-cols-custom">
          <Widget />
          <div className="w-[400px]">
            <SalesStat/>
          </div>
        </div>
        <Statistics />
     
      </div>
      {/* <DashboardBanner/> */}
    </div>
  );
};

export default DashboardIndex;
