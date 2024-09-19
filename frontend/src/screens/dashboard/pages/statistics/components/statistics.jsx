"use client";
import { GetPaymentHistory } from "@/features/payment/paymentReducer";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Statistics = () => {
  return (
    <div className="flex w-full">
      <GrowthStat />
    </div>
  );
};

const GrowthStat = () => {
  const { totalStatAmount, totalMonth } = useSelector((store) => store.stat);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "bar",
      fontFamily: "Work Sans",
      foreColor: "#333",
      fontSize: "30px",
      textTransform: "capitalize",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#000", "var(--primary)"],
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Febr",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "sept",
      ],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Transactions",
      data: [10, 34, 55, 60, 120, 44, 15, 27, 20],
    },
    {
      name: "Quantity",
      data: [10, 14, 25, 50, 100, 24, 15, 27, 20],
    },
    // {
    //   name: "Transactions",
    //   data: [20, 40, 15, 70, 20, 4, 5, 17, 20],
    // },
  ]);
  // const [options, setOptions] = useState({
  //   chart: {
  //     height: 350,
  //     type: "bar",
  //     fontFamily: "Work Sans",
  //     foreColor: "#333",
  //     fontSize: "30px",
  //     textTransform: "capitalize",
  //     zoom: {
  //       enabled: false,
  //     },
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   colors: ["var(--dark-1)", "#247BA0"],
  //   stroke: {
  //     curve: "smooth",
  //   },
  //   xaxis: {
  //     categories: totalMonth,
  //   },
  // });

  // const [series, setSeries] = useState([
  //   {
  //     name: "Transactions",
  //     data: totalStatAmount,
  //   },
  // ]);
  // useEffect(() => {
  //   if (Array.isArray(totalMonth) && Array.isArray(totalStatAmount)) {
  //     if (totalMonth.length !== 0 || totalStatAmount.length !== 0) {
  //       setOptions((prevOptions) => ({
  //         ...prevOptions,
  //         xaxis: {
  //           categories: totalMonth,
  //         },
  //       }));
  //       setSeries([
  //         {
  //           name: "Transactions",
  //           data: totalStatAmount,
  //         },
  //       ]);
  //     }
  //   }
  // }, [totalStatAmount, totalMonth, setSeries, setOptions]);
  return (
    <div id="chart" className="w-full ">
      <div
        className="w-full min-h-[400px] flex flex-col gap-4 rounded-xl px-4 md:px-8 md:py-12
       overflow-hidden bg-[#fff] border border-[rgba(0,0,0,.08)]"
      >
        <h3 className="text-3xl md:text-4xl font-booking_font4 font-bold">
          Report Sales
        </h3>
        <div className="w-full flex-col rounded-[10px] flex gap-4">
          <div className="flex w-full flex-col gap-8">
            <Chart
              options={options}
              series={series}
              type="bar"
              width={"100%"}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
