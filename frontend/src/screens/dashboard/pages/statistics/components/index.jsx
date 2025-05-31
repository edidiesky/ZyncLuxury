import React, { useEffect } from "react";
import Widget from "./widget";
import Statistics from "./statistics";
import { useSelector, useDispatch } from "react-redux";
import { getAdminStat } from "@/features/stat/statReducer";
import { getAllRoomsForAdmin } from "@/features/room/roomReducer";
import RoomsCreated from "./RoomsCreated";
import CardLoader from "@/components/common/CardLoader";
import { BookingAreaChart } from "@/screens/dashboard/components/charts/BookingAreaChart";
import { BookingDataTable } from "@/screens/dashboard/components/table";
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
  
  const data = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
      name: "Daniel John",
      location: "Samuel Kong",
      nationality: "Niegria",
      payment_ref: "N23yvdjc+-iegria",
    },
    {
      id: "3u1reuv4",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
      name: "Daniel John",
      location: "Samuel Kong",
      nationality: "Niegria",
      payment_ref: "N23yvdjc+-iegria",
    },
    {
      id: "derv1ws0",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
      name: "Daniel John",
      location: "Samuel Kong",
      nationality: "Niegria",
      payment_ref: "N23yvdjc+-iegria",
    },
    {
      id: "5kma53ae",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
      name: "Daniel John",
      location: "Samuel Kong",
      nationality: "Niegria",
      payment_ref: "N23yvdjc+-iegria",
    },
    {
      id: "bhqecj4p",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
      name: "Daniel John",
      location: "Samuel Kong",
      nationality: "Niegria",
      payment_ref: "N23yvdjc+-iegria",
    },
  ];
  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-8">
        <div className="w-full flex flex-col gap-1">
          <h3 className="text-3xl block lg:text-3xl text-dark family2">
            Dashboard
          </h3>
          <span className="block family1 text-base lg:text-lg font-normal">
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

          <div className="w-full">
            <BookingAreaChart
              title={"Payment Overview"}
              description={"Showing total visitors for the last 3 months"}
            />
          </div>

          <BookingDataTable
            title={"Welcome back!"}
            data={data}
            description={"Here's a list of your booking for this month."}
          />
        </div>
        {/* widget */}
      </div>
    </div>
  );
};

export default DashboardIndex;
