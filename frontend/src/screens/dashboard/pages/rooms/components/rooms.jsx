 
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BiSearch, BiChevronRight, BiChevronLeft } from "react-icons/bi";
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
      <div className="w-full">
        <Table>
          <div className="TableContainer">
            <table className="tableWrapper">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>Room Description</th>
                  {/* <th>Location</th> */}
                  {/* <th>City</th> */}
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
        {rooms?.length > 0 ? (
          <div className="w-full mt-4 family2 flex items-center justify-end gap-4 ">
            <div
              onClick={() => dispatch(handlePage("prev"))}
              className="p-2 rounded-md text-lg font-semibold family1 px-2 border hover:opacity-[.8] cursor-pointer border-[rgba(0,0,0,0.2)]"
            >
              <BiChevronLeft />
            </div>
            {page}
            <div
              onClick={() => dispatch(handlePage("next"))}
              className="p-2 rounded-md text-lg font-semibold family1 px-2 border hover:opacity-[.8] cursor-pointer border-[rgba(0,0,0,0.3)]"
            >
              {" "}
              <BiChevronRight />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default RoomsList;
