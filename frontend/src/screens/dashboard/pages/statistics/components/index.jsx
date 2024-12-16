import React, { useEffect } from "react";
import Widget from "./widget";
import Statistics from "./statistics";
import { useSelector, useDispatch } from "react-redux";
import { getAdminStat } from "@/features/stat/statReducer";
import Loader from "@/components/home/loader";
import { Link, NavLink } from "react-router-dom";
import { apartmentDataList } from "@/data/apartmentData";
import Image from "@/components/common/Image";
import { getAllRoomsForAdmin } from "@/features/room/roomReducer";
import RoomsCreated from "./RoomsCreated";
import CardLoader from "@/components/common/CardLoader";
const DashboardIndex = () => {
  const { getStatisLoading } = useSelector((store) => store.stat);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminStat());
    dispatch(getAllRoomsForAdmin());
  }, []);
  // if (getStatisLoading) {
  //   return <Loader />;
  // }
  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-8">
        <div className="w-full flex flex-col gap-1">
          <h3 className="text-2xl block lg:text-4xl text-dark family2">
            Dashboard
          </h3>
          <span className="block family1 text-base font-normal">
            Overview of your properties regarding Rentals management
          </span>
        </div>
        <div className="w-full grid items-start gap-12 lg:gap-12 lg:grid-cols-1">
          <div className="w-full">
            {getStatisLoading ? (
              <CardLoader type={"dashboard_overview"} />
            ) : (
              <Widget />
            )}
          </div>

          <div className="w-full flex flex-col gap-12">
            {getStatisLoading ? (
              <CardLoader type={"dashboard"} />
            ) : (
              <Statistics />
            )}
          </div>

          <RoomsCreated />
        </div>
        {/* widget */}
      </div>
    </div>
  );
};

export default DashboardIndex;
