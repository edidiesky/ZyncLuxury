"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "A stacked bar chart with a legend";

export function BarChartStacked({
  title,
  description,
  data,
  chartConfig,
  dataKeys,
  onFilterChange,
  selectedFilter,
}) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <p className="text-sm font-medium">
            {new Date(label).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <div className="mt-2 space-y-1">
            {dataKeys.map((key, index) => (
              <div key={key.datakey} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: key.color }}
                />
                <span className="text-sm medium">
                  {chartConfig[key.datakey]?.label}:{" "}
                  {chartConfig[key.datakey]?.label.includes("Total Amount") ||
                  chartConfig[key.datakey]?.label.includes("Total Revenue") ||
                  chartConfig[key.datakey]?.label.includes("Total Assessment")
                    ? "₦ "
                    : ""}
                  {Number(payload[index].value).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full pb-4 border rounded-2xl flex flex-col gap-8">
      <div className="w-full p-6 flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-base font-bold">{title}</h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        <div className="">
          <Select
            value={selectedFilter}
            onValueChange={(value) => onFilterChange(value)}
          >
            <SelectTrigger className="w-[100px] font-bold">
              <SelectValue placeholder="Select Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className='text-sm font-bold' value="7-days">7 Days</SelectItem>
              <SelectItem className='text-sm font-bold' value="3-weeks">3 Weeks</SelectItem>
              <SelectItem className='text-sm font-bold' value="3-months">3 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {data?.length === 0 ? (
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <img src="/assets/icons/stocks.png" alt="" />
          <h5 className="text-base">No Chart Data Available</h5>
        </div>
      ) : (
        <CardContent className="mt-6 w-full">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[290px] lg:h-[350px] w-full"
          >
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  if (isNaN(date.getTime())) {
                    console.error("Invalid date value:", value);
                    return value; // Fallback to raw value if invalid
                  }
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <YAxis />
              <ChartTooltip content={<CustomTooltip />} />
              <ChartLegend content={<ChartLegendContent />} />
              {dataKeys.map((key, index) => (
                <Bar
                  key={key.datakey}
                  dataKey={key.datakey}
                  stackId="a"
                  fill={key.color}
                  radius={
                    dataKeys?.length > 1
                      ? index === 0
                        ? [0, 0, 20, 20]
                        : [20, 20, 0, 0]
                      : [20, 20, 20, 20]
                  }
                />
              ))}
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
    </div>
  );
}
