"use client";
import React, { useState } from "react";
import { MdHotel } from "react-icons/md";
import { GiCash } from "react-icons/gi";
import { LuBedDouble } from "react-icons/lu";
import { useSelector } from "react-redux";
import { FaRegUser, FaHotel, FaMoneyBill } from "react-icons/fa";

const Widget = () => {
  const [widgettab, setWidgetTab] = useState(1);
  const { totalOrder, totalReservations, totalRooms } =
    useSelector((store) => store.stat);
  const { users } = useSelector((store) => store.auth);

  const widgetData = [
    // {
    //   title: "Total Revenue",
    //   icon: <FaMoneyBill />,
    //   color: "#E7EEE9",
    //   // subtitle: `${totalOrder}`,
    //   subtitle: `$10K`,
    // },
    {
      title: "Total Property",
      icon: <MdHotel />,
      color: "#E2E3E7",
      subtitle: `${totalRooms}`,
    },
    {
      title: " Total Revenue",
      icon: <GiCash />,
      color: "#FF7F5C",
      subtitle: `$${Number(totalOrder)?.toLocaleString()}`,
    },
    {
      title: "Total Reserved",
      icon: <LuBedDouble />,
      color: "#EFE7D7",
      subtitle: `${totalReservations}`,
    },
  ];
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-2">
      {widgetData?.map((widget, index) => {
        return (
          <div className="p-1 rounded-xl min-h-56 bg-[#fafafa]">
            <div
              onClick={() => setWidgetTab(index)}
              key={index}
              style={{ transition: "all .3s" }}
              className={`p-4 md:p-8 md:px-4 border family1 font-booking_font4 w-full
               rounded-xl bg-[#fff] flex md:items-center gap-4 h-full`}
            >
              <div className="flex flex-col gap-4 h-full justify-between">
                <div className="w-full flex md:items-center flex-col md:flex-row gap-4">
                  <div
                    style={{ background: `${widget?.color}` }}
                    className={`w-12 md:w-14 text-dark text-lg md:text-xl h-12 md:h-14 rounded-full flex items-center justify-center`}
                  >
                    {widget?.icon}
                  </div>
                  <span className="text-dark flex-1 text-sm md:text-base font-semibold">
                    {widget?.title}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-normal">
                  {widget?.subtitle}
                </h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Widget;
