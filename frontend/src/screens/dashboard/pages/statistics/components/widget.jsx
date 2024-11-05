import React, { useState } from "react";
import { MdHotel } from "react-icons/md";
import { GiCash } from "react-icons/gi";
import { LuBedDouble } from "react-icons/lu";
import { useSelector } from "react-redux";
import { GoArrowUpRight, GoArrowDownRight } from "react-icons/go";
import {  FaMoneyBill } from "react-icons/fa";

const Widget = () => {
  const { totalOrder, totalReservations, totalRooms } = useSelector(
    (store) => store.stat
  );

  const widgetData = [
    {
      title: "Total Revenue",
      icon: <FaMoneyBill />,
      bgColor: "#cdeed3b7",
      color: "#61668E",
      subtitle: `${totalOrder}`,
      trend: "+20.1",
      // subtitle: `$10K`,
    },
    {
      title: "Total Property",
      icon: <MdHotel />,
      bgColor: "#deddffcc",
      color: "#F2B80F",
      trend: "+20.1",
      subtitle: `${totalRooms}`,
    },
    {
      title: " Total Revenue",
      icon: <GiCash />,
      bgColor: "#ffeec3ca",
      color: "#7F3CDA",
      trend: "+20.1",
      subtitle: `$${Number(totalOrder)?.toLocaleString()}`,
    },
    {
      title: "Total Reservations",
      icon: <LuBedDouble />,
      bgColor: "#f3f3f1d2",
      color: "#E3413F",
      trend: "+20.1",
      subtitle: `${totalReservations}`,
    },
  ];
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
      {widgetData?.map((data, index) => {
        return (
          <div
            key={index}
            className="w-full p-4 items-start  justify-center min-h-[200px] md:min-h-[250px] border rounded-xl flex flex-col gap-4"
          >
            <div className="flex flex-col w-full gap-4">
              <div className="flex md:flex-row flex-col md:items-center gap-1 md:gap-4">
                <div
                  style={{
                    backgroundColor: `${data?.bgColor}`,
                    color: `${data?.color}`,
                  }}
                  className="w-10 md:w-12 text-xl flex items-center justify-center h-10 md:h-12 rounded-md"
                >
                  {data?.icon}
                </div>
                <h4 className="text-sm md:text-base regular">{data?.title}</h4>
              </div>
              <div className="w-full family1 flex flex-col">
                <h3 className="text-3xl md:text-4xl family2">
                  {data?.subtitle}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full">
              <div className="w-6 text-sm text-[#000] h-6 rounded-full bg-[#4AFC4E] flex items-center justify-center">
                <GoArrowUpRight />
              </div>
              <span className="text-xs lg:text-sm family2">
                {data?.trend} from last week
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Widget;
