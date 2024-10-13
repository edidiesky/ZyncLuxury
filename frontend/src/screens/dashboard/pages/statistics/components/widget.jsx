"use client";
import React, { useState } from "react";
import { MdHotel } from "react-icons/md";
import { GiCash } from "react-icons/gi";
import { LuBedDouble } from "react-icons/lu";
import { useSelector } from "react-redux";
import { FaRegUser, FaHotel, FaMoneyBill } from "react-icons/fa";

const Widget = () => {
  const [widgettab, setWidgetTab] = useState(1);
  const { totalOrder, totalReservations, totalRooms } = useSelector(
    (store) => store.stat
  );
  const { users } = useSelector((store) => store.auth);

  const widgetData = [
    {
      title: "Total Revenue",
      icon: <FaMoneyBill />,
      bgColor: "#cdeed3",
      color: "#347345",
      // subtitle: `${totalOrder}`,
      subtext:
        "Browse your applied jobs here and check their respective progress..",
      subtitle: `$10K`,
    },
    {
      title: "Total Property",
      icon: <MdHotel />,
      bgColor: "#deddff",
      color: "#3e3aff",
      subtext:
        "Browse your applied jobs here and check their respective progress..",
      subtitle: `${totalRooms}`,
    },
    {
      title: " Total Revenue",
      icon: <GiCash />,
      bgColor: "#f3f3f1",
      color: "#a37d18",
      subtext:
        "Browse your applied jobs here and check their respective progress..",
      subtitle: `$${Number(totalOrder)?.toLocaleString()}`,
    },
    {
      title: "Total Reserved",
      icon: <LuBedDouble />,
      bgColor: "#cdeed3",
      color: "#002b31",
      subtext:
        "Browse your applied jobs here and check their respective progress..",
      subtitle: `${totalReservations}`,
    },
  ];
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-2 gap-4 md:gap-4">
      {widgetData?.map((data, index) => {
        return (
          <div
            key={index}
            className="w-full p-4 items-start  justify-center min-h-[200px] md:min-h-[250px] 
                    border rounded-xl flex flex-col gap-4"
          >
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
              <h4 className="text-sm md:text-base font-semibold">
                {data?.title}
              </h4>
            </div>
            <div className="w-full family1 flex flex-col">
              <h3 className="text-3xl md:text-5xl font-semibold">10</h3>

              <span className="text-xs flex-1 pt-2 block font-normal">
                {data?.subtext}
              </span>
            </div>
            {/* <div className="pt-3">
                    <div className="shadows py-2 bg-[#fafafa] rounded-md cursor-pointer px-4 border text-dark text-sm">Browse</div>
                  </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default Widget;
