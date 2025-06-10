import React, { useState } from "react";
import { MdHotel } from "react-icons/md";
import { GiCash } from "react-icons/gi";
import { LuBedDouble } from "react-icons/lu";
import { useSelector } from "react-redux";
import { GoArrowUpRight, GoArrowDownRight } from "react-icons/go";
import { FaMoneyBill } from "react-icons/fa";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
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
    <div className="w-full grid  grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
      {widgetData?.map((data, index) => {
        return (
          <div
            key={index}
            className="w-full p-4 border rounded-lg items-start justify-center bg-[#fff] border-r flex flex-col gap-4 md:gap-8"
          >
            <div className="flex flex-col w-full gap-4">
              <h4 className="text-grey w-full border-b pb-3 family1 text-base">
                {data?.title}
              </h4>
              <h2 className="text-3xl lg:text-4xl family2">1,218</h2>
              <div className="w-full pt-3 border-t flex family1 items-center justify-between">
                <h4 className="flex gap-1 items-center text-xl">
                  <HiMiniArrowTrendingUp />
                  <span className="text-base family2">{data?.trend}</span>
                </h4>
                <span className="text-base text-grey">
                  increase vs last month
                </span>
              </div>
            </div>

            {/* <div className="flex flex-col w-full gap-4">
              <div className="flex flex-col gap-1 md:gap-4">
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
            </div>
            <div className="w-full family1 flex flex-col">
              <h3 className="text-3xl md:text-4xl family2">{data?.subtitle}</h3>
            </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default Widget;
