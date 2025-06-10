import React, { useState } from "react";
import RoomsList from "./orderlist";
import CardLoader from "@/components/common/CardLoader";
import Widget from "../../statistics/components/widget";
import { BookingDataTable } from "@/screens/dashboard/components/table";
import { data } from "@/constants/data/table";
const DashboardIndex = () => {
  const [roommodal, setRoomModal] = useState(false);
  const getsingleReservationisLoading = false
  return (
    <div className="w-full min-h-[100vh]">
      <div className="w-full pb-20 flex flex-col gap-12">
        <div className="w-full grid lg:grid-cols-2 lg:items-center gap-4 justify-between">
          <div className="w-full flex flex-col gap-1">
            <h3 className="text-2xl block lg:text-4xl text-dark family2">
              Transactions List
            </h3>
            <span className="block family1 text-base lg:text-lg font-normal">
              Make a review of your customers either by adding or modifying
              their content
            </span>
          </div>
        </div>
        <div className="w-full grid items-start gap-12 lg:gap-12 lg:grid-cols-1">
          <div className="w-full">
            {getsingleReservationisLoading ? (
              <CardLoader type={"dashboard_overview"} />
            ) : (
              <Widget />
            )}
          </div>

          <BookingDataTable
            title={"Transactions overview!"}
            data={data}
            description={"Here's a list of your transactions for this month."}
          />
        </div>
        {/* <RoomsList /> */}
      </div>
    </div>
  );
};

export default DashboardIndex;
