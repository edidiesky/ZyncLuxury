import React, { useEffect } from "react";
import Widget from "./widget";
import ReservationList from "./ReservationList";
import Statistics, { SalesStat } from "./statistics";
import { useSelector, useDispatch } from "react-redux";
import { getAdminStat } from "@/features/stat/statReducer";
import Loader from "@/components/home/loader";
import { GetAllUsers } from "@/features/auth/authReducer";
import { NavLink } from "react-router-dom";
import Nav from "@/components/common/Nav";
const DashboardIndex = () => {
  const { currentUser } = useSelector((store) => store.auth);
  const { getStatisLoading } = useSelector((store) => store.stat);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAdminStat());
  //   dispatch(GetAllUsers());
  // }, []);
  // if (getStatisLoading) {
  //   return <Loader />;
  // }
  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-8">
        <div className="w-full grid gap-8 md:grid-cols-1">
          <Widget />
        </div>
        <div className="w-full grid grid-cols-custom gap-4">
          <div className="w-full bg-[#eee]"></div>
          <div className="w-[300px] bg-[#fafafa] "></div>
        </div>
        <div className="w-full grid grid-cols-custom items-start gap-4">
             {/*sales stat */}
          <SalesStatistics/>
          {/* property type stat */}
          <PropertyType />
        </div>
      </div>
    </div>
  );
};

const PropertyType = () => {
  return (
    <div className="w-[360px] min-h-[460px] rounded-3xl justify-between p-6 overflow-hidden bg-[#f1f1f1] flex flex-col gap-6">
      <h4 className="text-xl md:text-2xl font-bold">
        Property Type
        <sapn className="text-grey block pt-1 font-light text-sm">
          Track your Property Type
        </sapn>
      </h4>
      <div className="w-[60%] mx-auto flex flex-col gap-1">
        <div className="w-full flex items-center justify-between">
          <span className="flex text-lg font-bold">Villa</span>
          <span className="text-lg">400</span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="flex text-lg font-bold">Hotel</span>
          <span className="text-lg">400</span>
        </div>{" "}
        <div className="w-full flex items-center justify-between">
          <span className="flex text-lg font-bold">Apartment</span>
          <span className="text-lg">400</span>
        </div>
      </div>
    </div>
  );
};

const SalesStatistics = () => {
  return (
    <div className="w-full min-h-[400px] rounded-3xl p-6 overflow-hidden bg-[#f1f1f1]">
      <h4 className="text-xl md:text-2xl font-bold">
        Report Sales
        <sapn className="text-grey block pt-1 font-light text-sm">
          Track your Property Type
        </sapn>
      </h4>
    </div>
  );
};

export default DashboardIndex;
