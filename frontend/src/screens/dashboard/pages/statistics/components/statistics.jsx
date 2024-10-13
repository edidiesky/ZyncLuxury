"use client";
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";

const Statistics = () => {
  return (
    <div className="flex w-full">
      {/* <GrowthStat /> */}
      <Charts/>
    </div>
  );
};

const Charts = () => {
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
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      // categories: totalMonth,
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
      name: "Revenue",
      data: [120, 30, 20, 10, 30, 30, 40, 40, 20, 35],
    },
  ]);
  return (
    <div className="py-8 border rounded-lg flex flex-col w-full gap-6">
      <h3 className="text-xl px-4 block lg:text-2xl text-dark family2 font-semibold">
        Growth Analysis
      </h3>
      <div className="w-full">
        <Chart
          options={options}
          series={series}
          type="bar"
          width={"100%"}
          height={"250px"}
        />
      </div>
    </div>
  );
};
// const GrowthStat = () => {
//   const { totalMonthBookings, totalMonth, totalMonthRevenue } = useSelector(
//     (store) => store.stat
//   );
//   const [options, setOptions] = useState({
//     chart: {
//       height: 350,
//       type: "line",
//       fontFamily: "Work Sans",
//       foreColor: "#333",
//       fontSize: "30px",
//       textTransform: "capitalize",
//       zoom: {
//         enabled: false,
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     colors: ["var(--primary)", "#000"],
//     stroke: {
//       curve: "smooth",
//     },
//     xaxis: {
//       categories: totalMonth,
//       // categories: [
//       //   "Jan",
//       //   "Febr",
//       //   "Mar",
//       //   "Apr",
//       //   "May",
//       //   "Jun",
//       //   "Jul",
//       //   "Aug",
//       //   "sept",
//       // ],
//     },
//   });

//   const [series, setSeries] = useState([
//     {
//       name: "Transactions",
//       // data: [10, 34, 55, 60, 120, 44, 15, 27, 20],
//       data: totalMonthRevenue,
//     },
//     // {
//     //   name: "Monthly Bookings",
//     //   // data: [10, 14, 25, 50, 100, 24, 15, 27, 20],
//     //   data: totalMonthBookings,
//     // },
//   ]);


//   useEffect(() => {
//     if (
//       Array.isArray(totalMonth) &&
//       Array.isArray(totalMonthBookings) &&
//       Array.isArray(totalMonthRevenue)
//     ) {
//       if (
//         totalMonth.length !== 0 ||
//         totalMonthBookings.length !== 0 ||
//         totalMonthRevenue.length !== 0
//       ) {
//         setOptions((prevOptions) => ({
//           ...prevOptions,
//           xaxis: {
//             categories: totalMonth?.slice(0,10),
//           },
//         }));
//         setSeries([
//           {
//             name: "Transactions",
//             // data: [10, 34, 55, 60, 120, 44, 15, 27, 20],
//             data: totalMonthRevenue?.slice(0,10),
//           },
//           // {
//           //   name: "Monthly Bookings",
//           //   // data: [10, 14, 25, 50, 100, 24, 15, 27, 20],
//           //   data: totalMonthBookings?.slice(0,6),
//           // },
//         ]);
//       }
//     }
//   }, [
//     totalMonthBookings,
//     totalMonth,
//     totalMonthRevenue,
//   ]);
//   // console.log(`"totalMonthBookings":${totalMonthBookings}`);
//   // console.log(`"totalMonthRevenue":${totalMonthRevenue}`);
//   return (
//     <div id="chart" className="w-full ">
//       <div
//         className="w-full min-h-[400px] flex flex-col gap-4 rounded-xl px-4 md:px-8 md:py-12
//        overflow-hidden bg-[#fff] border border-[rgba(0,0,0,.08)]"
//       >
//         <h3 className="text-3xl md:text-4xl font-booking_font4 font-bold">
//           Report Sales
//         </h3>
//         <div className="w-full flex-col rounded-[10px] flex gap-4">
//           <div className="flex w-full flex-col gap-8">
//             <Chart
//               options={options}
//               series={series}
//               type="line"
//               width={"100%"}
//               height={500}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Statistics;
