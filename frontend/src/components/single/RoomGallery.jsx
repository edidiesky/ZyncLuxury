"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "../common/Image";
export default function RoomGallery() {
  const [tabindex, setTabIndex] = useState(0);
  const { room } = useSelector((store) => store.room);
  return (
    <div className="w-full relative overflow-hidden">
      <div className="lg:grid-cols-2 grid gap-2">
        <div className="w-full h-[310px] overflow-hidden rounded-xl md:h-[400px]">
          <Image alt="Cotion" src={room?.images[0]} />
        </div>
        <div className="w-full hidden lg:grid grid-cols-2 gap-2">
          {room?.images?.slice(0, 4)?.map((image, index) => {
            return (
              <div
                key={index}
                className="w-full h-[200px] overflow-hidden rounded-xl"
              >
                <Image src={image} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
