"use client";
import React, { useState } from "react";
import { MdHotel } from "react-icons/md";
import { GiCash } from "react-icons/gi";
import { LuBedDouble } from "react-icons/lu";
import { useSelector } from "react-redux";
import { FaRegUser, FaHotel, FaMoneyBill } from "react-icons/fa";

const Widget = () => {
  const [widgettab, setWidgetTab] = useState(1);
  const { totalOrderAmount, totalOrder, totalReservations, totalRooms } =
    useSelector((store) => store.stat);
  const { users } =
    useSelector((store) => store.auth);

  const widgetData = [
    {
      title: "New Booking",
      icon: <MdHotel />,
      color: "#5B5DB4",
      subtitle: `${totalOrder}`,
    },
    {
      title: "Total Rooms",
      icon: <MdHotel />,
      color: "#FF7F5C",
      subtitle: `${totalRooms}`,
    },
    // {
    //   title: " Total Revenue",
    //   icon: <GiCash />,
    //   color: "#FF7F5C",
    //   subtitle: `$${totalOrderAmount}`,
    // },
    {
      title: "Total Reserved",
      icon: <LuBedDouble />,
      color: "#489BC5",
      subtitle: `${totalReservations}`,
    },
    {
      title: "Total Clients",
      icon: <FaRegUser />,
      color: "#101f26",
      subtitle: `${users?.length}`,
    },
  ];
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-2 gap-4">
      {widgetData?.map((widget, index) => {
        return (
          <div
            onClick={() => setWidgetTab(index)}
            key={index}
            style={{ transition: "all .3s" }}
            className={`p-6 md:p-8 font-booking_font4 w-full rounded-[10px] hover:shadow-2xl flex-col-reverse md:flex-row justify-between cursor-pointer border flex bg-white md:items-center gap-4 h-48`}
          >
            <div className="flex flex-col">
              <h3 className="text-4xl font-bold font-booking_font4">
                <span className="text-grey pb-2 font-booking_font block text-base font-normal">
                  {widget?.title}
                </span>
                {widget?.subtitle}
              </h3>
            </div>
            <div
              style={{ background: `${widget?.color}` }}
              className={`w-10 md:w-12 text-white text-lg md:text-2xl h-10 md:h-12 rounded-full flex items-center justify-center`}
            >
              {widget?.icon}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Widget;
