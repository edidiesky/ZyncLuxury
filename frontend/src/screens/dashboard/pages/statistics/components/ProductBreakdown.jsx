import React, { useState } from "react";
import Chart from "react-apexcharts";
const ProductBreakdown = () => {
  const [options, setOptions] = useState({
    series: [4, 15, 7, 8],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
        fontFamily: "Work Sans",
        foreColor: "#333",
        fontSize: "30px",
      },
      colors: ["#f73760", "#000", "#be9874", "#24E5A3"],
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
              fontFamily: "Work Sans",
              foreColor: "#333",
            },
            value: {
              fontSize: "16px",
              fontFamily: "Work Sans",
              foreColor: "#333",
            },
            total: {
              show: true,
              label: "Total Property",
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 34;
              },
            },
          },
        },
      },
      labels: ["VILLA", "HOTEL", "APARTMENT", "STAY"],
    },
  });

  const menuLabels = [
    {
      title: "VILLA",
      color: "#f73760",
    },
    {
      title: "HOTEL",
      color: "#000",
    },
    {
      title: "APARTMENT",
      color: "#be9874",
    },
    {
      title: "STAY",
      color: "#24E5A3",
    },
  ];
  return (
    <div className="w-full md:w-[400px] flex flex-col py-8 md:py-12 bg-[#fff] border border-[rgba(0,0,0,.08)] rounded-3xl gap-4">
      <div className="w-full px-6 flex items-center justify-between">
        <h3 className="text-xl lg:text-2xl font-semibold family1">
          Property Type Breakdown
        </h3>
      </div>

      <div className="flex h-full w-full flex-col gap-1">
        <Chart
          options={options.options}
          series={options?.series}
          type="radialBar"
          width={"100%"}
          height={"400px"}
        />
        <div className="w-full px-4 flex items-center justify-center flex-wrap gap-1">
          {menuLabels?.map((label, index) => {
            return (
              <span
                key={index}
                className="flex items-center gap-2 text-sm family1"
              >
                {label?.title}
                <div
                  style={{
                    background: `${label?.color}`,
                  }}
                  className="w-2 h-2 rounded-full"
                ></div>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductBreakdown;
