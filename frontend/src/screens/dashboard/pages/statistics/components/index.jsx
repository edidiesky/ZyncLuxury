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
import { getAllRoomsForAdmin } from "@/features/room/roomReducer";
import RoomsCreated from "./RoomsCreated";
const DashboardIndex = () => {

  const { getStatisLoading } = useSelector((store) => store.stat);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminStat());
    dispatch(getAllRoomsForAdmin());
  }, []);
  if (getStatisLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-8">
        <div className="w-full flex flex-col gap-1">
          <h3 className="text-2xl block lg:text-3xl text-dark family2 font-semibold">
            Dashboard
          </h3>
          <span className="block family1 text-base font-normal">
            Overview of your properties regarding Rentals management
          </span>
        </div>
        <div className="w-full grid gap-12 lg:gap-4 lg:grid-cols-custom">
          <Widget />
          <div className="w-full lg:w-[500px] flex flex-col gap-12">
            <Statistics />
          </div>
        </div>
        {/* widget */}

        <RoomsCreated />
      </div>
    </div>
  );
};


const Transaction = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full min-h-[400px] rounded-3xl space-y-8 p-6 px-4 lg:py-12 overflow-hidden bg-[#fff] border border-[rgba(0,0,0,.08)]">
        <div className="w-full flex items-center pr-4 justify-between">
          <h4 className="text-xl lg:text-2xl font-bold">Latest Transaction</h4>
          <Link
            to={`/dashboard/orders`}
            className="text-dark underline block pt-1 font-normal text-sm"
          >
            See All
          </Link>
        </div>
        <div className="w-full flex flex-col gap-3">
          {apartmentDataList?.slice(0, 5).map((data, index) => {
            return (
              <div
                key={index}
                className="w-full pb-4 bg-[#fafafa]-b gap-8 flex items-center justify-between"
              >
                <div className="flex flex-1 items-center gap-3">
                  <div className="w-20 overflow-hidden">
                    <Image src={data?.images[0]} />
                  </div>
                  <h5 className="text-sm flex-1 font-normal family1">
                    {data?.title}
                    <span className="font-semibold block text-xs">
                      14 September 2024
                    </span>
                  </h5>
                </div>
                <div className="justify-end flex items-center">
                  <h5 className="text-lg font-normal family1">
                    ${data?.price}
                  </h5>
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
