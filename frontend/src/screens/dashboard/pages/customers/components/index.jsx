import React, { useState } from "react";
import CustomerList from "./customerlist";
import Widget from "../../statistics/components/widget";
import CardLoader from "@/components/common/CardLoader";
import { BookingDataTable } from "@/screens/dashboard/components/table";
import { data } from "@/constants/data/table";
const DashboardIndex = () => {
  const getsingleReservationisLoading = false;
  return (
    <div className="w-full">
      <div className="w-full pb-20 flex flex-col gap-12">
        <div className="w-full grid lg:grid-cols-2 lg:items-center gap-4 justify-between">
          <div className="w-full flex flex-col gap-1">
            <h3 className="text-2xl block lg:text-4xl text-dark family2">
              Customers List
            </h3>
            <span className="block family1 text-base font-normal">
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
            title={"Customer overview!"}
            data={data}
            description={"Here's a list of your customer for this month."}
          />
        </div>
        {/* <CustomerList /> */}
      </div>
    </div>
  );
};

export default DashboardIndex;
