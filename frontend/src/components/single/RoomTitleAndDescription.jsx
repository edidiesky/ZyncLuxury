"use client";
import React, { useRef } from "react";
import { useInView } from "framer-motion";
export default function RoomTitleAndDescription({ room }) {
  return (
    <>
      <div className="w-full flex flex-col gap-8">
        {/* title */}

        <div className="w-full pb-8 border-b flex flex-col gap-2">
          <h3 className="text-xl md:text-2xl family2">Description</h3>
          <h4 className="text-base md:text-lg leading-[1.8] family1 block font-booking_font font-normal text-dark">
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
