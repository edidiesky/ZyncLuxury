"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BiSearch } from "react-icons/bi";
import { Table } from "@/components/common/styles";
import TableCard from "@/components/common/TableCard";
import Loader from "@/components/home/loader";
import { handlePage } from "@/features/room/roomSlice";

const RoomsList = () => {
  const dispatch = useDispatch();
  const { rooms, getallRoomisLoading, page } = useSelector(
    (store) => store.room
  );
  return (
    <>
      {getallRoomisLoading && <Loader />}
      <div className="w-full bg-[#FAFAFA] min-h-[170px] items-center flex flex-col p-4 px-6 rounded-3xl">
      
        <Table>
          <div className="TableContainer">
            <table className="tableWrapper">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>Room Name</th>
                  {/* <th>Location</th> */}
                  <th>City</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {rooms?.map((x, index) => {
                  return <TableCard x={x} type={"rooms"} key={x?._id} />;
                })}
              </tbody>
            </table>
          </div>
        </Table>
        <div className="w-full flex items-center justify-end gap-2">
          <div
            onClick={() => dispatch(handlePage("prev"))}
            className="p-3 rounded-2xl text-sm font-bold font-booking_font_bold px-4 border hover:opacity-[.8] cursor-pointer border-[rgba(0,0,0,0.3)]"
          >
            Previous
          </div>
          {page}
          <div
            onClick={() => dispatch(handlePage("next"))}
            className="p-3 rounded-2xl text-sm font-bold font-booking_font_bold px-4 border hover:opacity-[.8] cursor-pointer border-[rgba(0,0,0,0.3)]"
          >
            Next
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomsList;
