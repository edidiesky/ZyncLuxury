import React, { useEffect } from "react";
import Widget from "./widget";
import Statistics from "./statistics";
import { useSelector, useDispatch } from "react-redux";
import { getAdminStat } from "@/features/stat/statReducer";
import Loader from "@/components/home/loader";
import { GetAllUsers } from "@/features/auth/authReducer";
import { Link, NavLink } from "react-router-dom";
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
        <h3 className="text-4xl block lg:text-5xl family1 font-bold">
          Welcome {currentUser?.username}
          <span className="block text-base font-normal">
            Explore information and activity about your property
          </span>
        </h3>
        <div className="w-full grid gap-12 lg:gap-4 lg:grid-cols-custom">
          <div className="w-full flex flex-col gap-20">
            <Widget />
            <Statistics />
          </div>
          <div className="w-full lg:w-[400px] flex flex-col gap-12">
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
    <div className="w-full flex flex-col gap-8">
      <div className="w-full px-4 flex items-center justify-between">
        <h4 className="text-3xl lg:text-4xl font-bold">
          My Properties
          <span className="text-grey block pt-1 font-normal text-sm">
            Track all your Property you have created for sell or rent
          </span>
        </h4>
        <Link
          to={`/dashboard/rooms`}
          className="text-dark underline block pt-1 font-normal text-sm"
        >
          See All
        </Link>
      </div>
      <div className="w-full min-h-[330px] space-y-8 rounded-3xl p-8 lg:p-12 overflow-hidden bg-[#fff] border border-[rgba(0,0,0,.08)]">
        <div className="w-full grid lg:grid-cols-3 gap-4">
          {apartmentDataList?.slice(0, 3).map((data, index) => {
            return <RoomCard apartment={data} type={"search"} />;
          })}
        </div>
      </div>
    </div>
  );
};

const Transaction = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex items-center pr-4 justify-between">
        <h4 className="text-2xl lg:text-3xl font-bold">Last Transaction</h4>
        <Link
          to={`/dashboard/orders`}
          className="text-dark underline block pt-1 font-normal text-sm"
        >
          See All
        </Link>
      </div>
      <div className="w-full min-h-[400px] rounded-3xl space-y-8 p-6 px-8 lg:py-12 overflow-hidden bg-[#fff] border border-[rgba(0,0,0,.08)]">
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
                  <h5 className="text-base flex-1 font-semibold family1">
                    {data?.title}
                    <span className="font-semibold block text-xs">
                      September 2024
                    </span>
                  </h5>
                </div>
                <div className="justify-end flex items-center">
                  <h5 className="text-lg font-normal family1">${data?.price}</h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default DashboardIndex;
