 
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Table } from "@/components/common/styles";
import TableCard from "@/components/common/TableCard";
import { useDispatch, useSelector } from "react-redux";
import { GetAllReservations } from "@/features/reservation/reservationReducer";

const ReservationList = () => {
  const dispatch = useDispatch();
  const { reservations } = useSelector((store) => store.reservation);

  useEffect(() => {
    dispatch(GetAllReservations());
  }, []);
  return (
    <div className="w-full border bg-white py-6 flex flex-col gap-4 shdow-xl rounded-[10px]">
      <div className="w-full px-6 flex items-center justify-between">
        <h3 className="text-xl font-booking_font4 family2">
          Booking History
        </h3>
        <Link
          style={{ textDecoration: "underline" }}
          className="text-sm text-[var(--dark-1)] font-booking_font_bold"
          to={"/dashboard/reservation"}
        >
          View All
        </Link>
      </div>
      {reservations?.length === 0 ? (
        <span
          className="block px-6 font-booking_font font-normal
       text-sm"
        >You have no bookings</span>
      ) : (
        <div className="w-full">
          {reservations?.map((data, index) => {
            return (
              <li
                key={index}
                className="text-base py-2 px-6 cursor-pointer hover:bg-[#fafafa] font-booking_font4 family2 flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-2">
                  {data?.user?.image ? (
                    <img
                      src={data?.user?.image}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#000] flex items-center justify-center text-white text-base">
                      {data?.user?.name[0]}
                    </div>
                  )}
                  <span className="text-base ">
                    <span className="capitalize">{data?.user?.username}</span>

                    <div className="block font-booking_font  font-normal text-xs text-grey">
                      {data?.user?.email}
                    </div>
                  </span>
                </div>

                <span className="text-lg">
                  ₦{data?.totalPrice}
                  <span className="block">
                    {data?.status === "CONFIRMED" ? (
                      <span className=" font-semibold text-[10px] px-3 py-2 bg-[#dcf6d9] text-center success">
                        {data?.status}
                      </span>
                    ) : (
                      <span className=" font-semibold text-[10px] px-3 py-2 bg-[#f3efe5] text-center danger">
                        {data?.status}
                      </span>
                    )}
                  </span>
                </span>
              </li>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReservationList;
