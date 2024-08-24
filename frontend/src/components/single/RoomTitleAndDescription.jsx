"use client";
import React, { useRef } from "react";
import { useInView } from "framer-motion";
export default function RoomTitleAndDescription({ room }) {
  return (
    <>
      <div className="w-full flex flex-col gap-8">
        {/* title */}

        <div className="w-full pb-12 border-b flex flex-col gap-6">
          <h3 className="text-4xl font-bold">Description</h3>
          <h4 className="text-lg leading-[1.8] block font-booking_font font-normal text-dark">
            With our single bedroom in a gated estate, Lekki. Feel free to treat
            yourself to a luxurious getaway filled with comfort, relaxation and
            unforgettable memories.
            {/* {room?.description} */}
          </h4>
        </div>
      </div>
    </>
  );
}
