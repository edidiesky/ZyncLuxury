"use client";
import React, { useState } from "react";
import { BiSearch, BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { Table } from "@/components/common/styles";
import TableCard from "@/components/common/TableCard";
import { useSelector, useDispatch } from "react-redux";

const OrderList = () => {
  const dispatch = useDispatch();
  const { payments } = useSelector((store) => store.payment);
  return (
    <div className="px-6 py-8 border rounded-lg flex flex-col w-full gap-6">
      <Table>
        <div className="TableContainer">
          <table className="tableWrapper">
            <thead>
              <tr>
                <th>Description</th>
                <th>Reservation ID</th>

                <th>Amount</th>
                <th>Currency</th>
                <th>Status</th>
                {/* <th className=''>Location</th> */}
                <th>Date Created</th>
                {/* <th>View Details</th> */}
              </tr>
            </thead>
            <tbody>
              {payments?.map((x, index) => {
                return <TableCard x={x} type={"orderlist"} key={x?._id} />;
              })}
            </tbody>
          </table>
        </div>
      </Table>
      {/* {payments?.length > 0 ? (
        <div className="w-full family1 flex items-center justify-end gap-4">
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
      )} */}
    </div>
  );
};

export default OrderList;
