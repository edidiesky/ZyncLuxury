import React, { useEffect } from "react";
import Widget from "./widget";
import Statistics from "./statistics";
import { useSelector, useDispatch } from "react-redux";
import { getAdminStat } from "@/features/stat/statReducer";
import Loader from "@/components/home/loader";
import { GetAllUsers } from "@/features/auth/authReducer";
import { NavLink } from "react-router-dom";
import { apartmentDataList } from "@/data/apartmentData";
import Image from "@/components/common/Image";
import ProductBreakdown from "./ProductBreakdown";
import RoomCard from "@/components/common/RoomCard";
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
      <div className="w-full flex flex-col gap-12">
        <h3 className="text-3xl md:block hidden md:text-4xl font-semibold">
          Welcome {currentUser?.username}
          <span className="block text-base font-light">
            Explore information and activity about your property
          </span>
        </h3>
        <div className="w-full grid gap-4 md:grid-cols-custom">
          <div className="w-full flex flex-col gap-8">
            <Widget />
            <Statistics />
          </div>
          <div className="w-[360px] flex flex-col gap-8">
            <ProductBreakdown />
            <Transaction />
          </div>
        </div>
        <Property />
      </div>
    </div>
  );
};


const Property = () => {
  return (
    <div className="w-full min-h-[330px] space-y-8 rounded-3xl px-8 py-12 overflow-hidden bg-[#fff] border border-[rgba(0,0,0,.08)]">
      <div className="w-full flex items-center justify-between">
        <h4 className="text-2xl md:text-3xl font-bold">
          My Units
          <span className="text-grey block pt-1 font-light text-sm">
            Track your Property Type
          </span>
        </h4>
        <span className="text-grey block pt-1 font-light text-sm">See All</span>
      </div>
      <div className="w-full grid md:grid-cols-3 gap-4">
        {apartmentDataList?.slice(0, 3).map((data, index) => {
          return <RoomCard apartment={data} type={"search"} />;
        })}
      </div>
    </div>
  );
};

const Transaction = () => {
  return (
    <div className="w-full min-h-[400px] rounded-3xl space-y-8 p-6 overflow-hidden bg-[#fff] border border-[rgba(0,0,0,.08)]">
      <div className="w-full flex items-center justify-between">
        <h4 className="text-xl md:text-2xl font-bold">Last Transaction</h4>
        <span className="text-grey block pt-1 font-light text-sm">See All</span>
      </div>
      <div className="w-full flex flex-col gap-3">
        {apartmentDataList?.slice(0, 3).map((data, index) => {
          return (
            <div
              key={index}
              className="w-full pb-4 bg-[#fafafa]-b gap-8 flex items-center justify-between"
            >
              <div className="flex flex-1 items-center gap-3">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <Image src={data?.images[0]} />
                </div>
                <h5 className="text-sm flex-1 font-semibold family1">
                  {data?.location}
                  <span className="font-light block text-xs">
                    September 2024
                  </span>
                </h5>
              </div>
              <div className="justify-end flex items-center">
                <h5 className="text-sm font-bold family1">${data?.price}</h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DashboardIndex;
