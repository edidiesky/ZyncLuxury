import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CiCreditCard1 } from "react-icons/ci";
import { AiOutlineThunderbolt } from "react-icons/ai";

export default function OverviewWidget() {
  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-3 gap-8">
        {/* sales widget */}
        <div className="border min-h-[340px] justify-between w-full p-6 rounded-3xl flex flex-col">
          {/* top */}
          <div className="w-full flex justify-between gap-4">
            <h4 className="text-lg font-bold">My Sales</h4>
            <div className="flex p-2 px-3 border rounded-full items-center gap-1">
              <h5 className="text-sm font-bold">All time</h5>
              <MdOutlineKeyboardArrowDown className="text-lg" />
            </div>
          </div>

          {/* bootom */}
          <div className="w-full flex flex-col items-start gap-8">
            <div className="w-full flex flex-col gap-1">
              <h5 className="text-base font-semibold text-gray-500">
                Total Balance
              </h5>

              <h2 className="text-3xl font-bold lg:text-5xl">$4,000,000</h2>
            </div>
            <div className="flex w-full items-start flex-col gap-1">
              <div className="flex p-2 px-3 bg-gray-100 rounded-full items-center gap-2">
                <CiCreditCard1 className="text-xl" />
                <h5 className="text-sm font-semibold">
                  Total earned last time
                </h5>
                <h5 className="text-sm font-semibold text-green-600">
                  +$100,000
                </h5>
              </div>
              {/* total bonus */}
              <div className="flex p-2 px-3 bg-gray-100 rounded-full items-center gap-2">
                <AiOutlineThunderbolt className="text-xl" />
                <h5 className="text-sm font-semibold">Total bonus</h5>
                <h5 className="text-sm font-semibold text-green-600">
                  +$100,000
                </h5>
              </div>
            </div>
          </div>
        </div>

        {/* reservation widget */}
        <div className="border min-h-[340px] justify-between w-full p-6 rounded-3xl flex flex-col">
          {/* top */}
          <div className="w-full flex justify-between gap-4">
            <h4 className="text-lg font-bold">My Reservations</h4>
            <div className="flex p-2 px-3 border rounded-full items-center gap-1">
              <h5 className="text-sm font-bold">All time</h5>
              <MdOutlineKeyboardArrowDown className="text-lg" />
            </div>
          </div>

          {/* bootom */}
          <div className="w-full flex flex-col items-start gap-4">
            <div className="w-full flex flex-col gap-1">
              <h5 className="text-base font-semibold text-gray-500">
                Total Bookings Created
              </h5>

              <h2 className="text-3xl font-bold lg:text-5xl">200</h2>
            </div>
            <div className="flex w-full items-center gap-1">
              <div className="flex p-2 px-3 bg-gray-100 rounded-full items-center gap-2">
                <CiCreditCard1 className="text-xl" />
                <h5 className="text-sm font-semibold">Min</h5>
                <h5 className="text-sm font-semibold text-green-600">
                  +$100,000
                </h5>
              </div>
              {/* total bonus */}
              <div className="flex p-2 px-3 bg-gray-100 rounded-full items-center gap-2">
                <AiOutlineThunderbolt className="text-xl" />
                <h5 className="text-sm font-semibold">Max</h5>
                <h5 className="text-sm font-semibold text-green-600">
                  +$100,000
                </h5>
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-1">
              <div className="flex px-3 border-l-2 border-gray-700 flex-col gap-2">
                <h5 className="text-sm font-semibold text-gray-400">
                  Max Price
                </h5>
                <h4 className="text-lg font-semibold ">+$1000</h4>
              </div>
              <div className="flex px-3 border-l-2 border-yellow-700 flex-col gap-2">
                <h5 className="text-sm font-semibold text-gray-400">
                  Min Price
                </h5>
                <h4 className="text-lg font-semibold ">+$500</h4>
              </div>
              <div className="flex px-3 border-l-2 border-green-700 flex-col gap-2">
                <h5 className="text-sm font-semibold text-gray-400">
                  Avg Price
                </h5>
                <h4 className="text-lg font-semibold ">+$1300</h4>
              </div>
            </div>
          </div>
        </div>
        {/* rooms widget */}
        <div className="border min-h-[340px] gap-8 w-full p-6 rounded-3xl flex flex-col">
          {/* top */}
          <div className="w-full flex justify-between gap-4">
            <h4 className="text-lg font-bold">My Rooms</h4>
            <div className="flex p-2 px-3 border rounded-full items-center gap-1">
              <h5 className="text-sm font-bold">All time</h5>
              <MdOutlineKeyboardArrowDown className="text-lg" />
            </div>
          </div>

          {/* bootom */}
          <div className="w-full flex flex-col items-start gap-4">
            <div className="w-full flex flex-col gap-3">
              <h5 className="text-base font-semibold text-gray-500">
                Total Rooms Created
              </h5>

              <h2 className="text-3xl font-bold lg:text-5xl">20</h2>

              <div className="flex w-full items-center gap-1">
                <div className="flex p-2 px-3 bg-gray-100 rounded-full items-center gap-2">
                  <CiCreditCard1 className="text-xl" />
                  <h5 className="text-sm font-semibold">Min</h5>
                  <h5 className="text-sm font-semibold text-green-600">
                    +10
                  </h5>
                </div>
                {/* total bonus */}
                <div className="flex p-2 px-3 bg-gray-100 rounded-full items-center gap-2">
                  <AiOutlineThunderbolt className="text-xl" />
                  <h5 className="text-sm font-semibold">Max</h5>
                  <h5 className="text-sm font-semibold text-green-600">
                    +10
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
