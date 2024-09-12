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
      <div className="w-full flex flex-col gap-8">
        <div className="w-full grid gap-8 md:grid-cols-1">
          <Widget />
        </div>
        <div className="w-full grid lg:grid-cols-custom items-start gap-4">
          {/*sales stat */}
          <Statistics />
          {/* property type stat */}
          <ProductBreakdown />
        </div>
        <div className="w-full grid lg:grid-cols-custom items-start gap-4">
          <Property />
          <Transaction />
        </div>
      </div>
    </div>
  );
};


const Property = () => {
  return (
    <div className="w-full min-h-[400px] space-y-8 rounded-3xl p-6 overflow-hidden bg-[#fff] border border-[rgba(0,0,0,.08)]">
      <div className="w-full flex items-center justify-between">
        <h4 className="text-xl md:text-2xl font-bold">
          My Units
          <span className="text-grey block pt-1 font-light text-sm">
            Track your Property Type
          </span>
        </h4>
        <span className="text-grey block pt-1 font-light text-sm">See All</span>
      </div>
      <div className="w-full grid md:grid-cols-2 gap-4">
        {apartmentDataList?.slice(0, 2).map((data, index) => {
          return <RoomCard apartment={data} type={"search"} />;
        })}
      </div>
    </div>
  );
};

const Transaction = () => {
  return (
    <div className="md:w-[400px] min-h-[400px] rounded-3xl space-y-8 p-6 overflow-hidden bg-[#fff] border border-[rgba(0,0,0,.08)]">
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
