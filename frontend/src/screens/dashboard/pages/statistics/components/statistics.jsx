"use client";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";

const Statistics = () => {
  return (
    <div className="flex w-full">
      <Charts />
    </div>
  );
};

const Charts = () => {
  const { totalMonthBookings, totalMonth, totalMonthRevenue } = useSelector(
    (store) => store.stat
  );
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: "bar",
      fontFamily: "Karla",
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
    colors: ["#2E0266", "var(--primary)"],
    xaxis: {
      categories: totalMonth,
      // categories: [
      //   "Jan",
      //   "Febr",
      //   "Mar",
      //   "Apr",
      //   "May",
      //   "Jun",
      //   "Jul",
      //   "Aug",
      //   "sept",
      // ],
    },
  });
  const [series, setSeries] = useState([
    {
      name: "Revenue",
      data: totalMonthRevenue,
      // data: [120, 30, 20, 10, 30, 30, 40, 40, 20, 35],
    },
  ]);

  useEffect(() => {
    if (
      Array.isArray(totalMonth) &&
      Array.isArray(totalMonthBookings) &&
      Array.isArray(totalMonthRevenue)
    ) {
      if (
        totalMonth.length !== 0 ||
        totalMonthBookings.length !== 0 ||
        totalMonthRevenue.length !== 0
      ) {
        setOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            categories: totalMonth?.slice(0, 10),
          },
        }));
        setSeries([
          {
            name: "Revenue",
            data: totalMonthRevenue?.slice(0, 10),
          },
        ]);
      }
    }
  }, [totalMonthBookings, totalMonth, totalMonthRevenue]);
  return (
    <div className="py-8 border rounded-lg flex flex-col w-full gap-6">
      <h3 className="text-xl px-4 block lg:text-2xl text-dark family2 ">
        Growth Analysis
      </h3>
      <div className="w-full">
        <Chart
          options={options}
          series={series}
          type="bar"
          width={"100%"}
          height={"400px"}
        />
      </div>
    </div>
  );
};

export default Statistics;
