"use client";
import React, { useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import RoomGallery from "./RoomGallery";
import RoomTitleAndDescription from "./RoomTitleAndDescription";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useSelector } from "react-redux";
import { FaShower } from "react-icons/fa";
import RoomFeatures from "./RoomFeatures";
import RoomPaymentTab from "./RoomPaymentTab";
import { Bed, Bookmark } from "lucide-react";
import { BsThreeDots } from "react-icons/bs";
import { LiaChartAreaSolid } from "react-icons/lia";
const RoomLists = () => {
  const [datemodal, setDateModal] = useState(false);
  const [guestsmodal, setGuestsModal] = useState(false);
  const [loginmodal, setLoginModal] = useState(false);
  const [registermodal, setRegisterModal] = useState(false);

  const [childrens, setChildrens] = useState(1);
  const [adults, setAdults] = useState(2);

  const { room, getallRoomisLoading } = useSelector((store) => store.room);

  const handleImagePosition = (position) => {
    if (position === "left") {
      setTabIndex(tabindex < 0 ? room?.images?.length - 1 : tabindex - 1);
    }
    if (position === "right") {
      setTabIndex(tabindex >= room?.images?.length ? 0 : tabindex + 1);
    }
  };

  return (
    <>
      <div
        className="w-full relative py-12 flex items-center justify-center
   gap-8"
      >
        <div className="w-[85%] max-auto max-w-custom flex flex-col gap-12">
          <div className="flex w-full flex-col gap-4">
            {/* <h3 className="text-4xl w-full family1 font-bold">
              {room?.subtitle}
            </h3> */}
            <RoomGallery room={room} />
          </div>
          <div
            className="w-full z-40 flex flex-col-reverse lg:grid lg:grid-cols-custom items-start justify-center
       gap-20"
          >
            <div className="w-full">
              <div className="flex flex-col gap-12 w-full">
                {/* room title */}
                <div className="w-full flex flex-col gap-4">
                  <div className="flex md:items-center justify-between gap-4">
                    <h3 className="text-4xl w-full family1 font-bold">
                      {room?.title}

                      <span className="text-sm pt-3 text-dark font-normal family1 flex items-center gap-3">
                        Room, London{" "}
                        <span className="flex items-center gap-1">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </span>
                      </span>
                    </h3>
                    <div className="flex items-center justify-end gap-4">
                      <div className=" flex text-lg cursor-pointer items-center gap-2 text-dark justify-center">
                        <Bookmark />
                        Save
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 border rounded-[10px] gap-8">
                    <div className="flex flex-col p-4 pl-8 border-r min-h-[100px] justify-center gap-1 text-sm font-booking_font4 text-dark">
                      <span className="text-lg font-bold">Bedroom</span>
                      <div className="flex items-center gap-4">
                        <span className="text-base">{room?.bedroom} </span>
                        <Bed fontSize={"32px"} />
                      </div>
                    </div>
                    <div className="flex flex-col pr-4 border-r min-h-[100px] justify-center gap-1 text-sm font-booking_font4 text-dark">
                      <span className="text-lg font-bold">Bathroom</span>
                      <div className="flex items-center gap-4">
                        <span className="text-base">{room?.bathroom} </span>
                        <FaShower fontSize={"30px"} />
                      </div>
                    </div>
                    <div className="flex flex-col pr-4 border-r min-h-[100px] justify-center gap-1 text-sm font-booking_font4 text-dark">
                      <span className="text-lg font-bold">Bedroom</span>
                      <div className="flex items-center gap-3">
                        <span className="text-base">1220 sq.ft </span>

                        <LiaChartAreaSolid fontSize={"30px"} />
                      </div>
                    </div>
                    <div className="flex flex-col pr-4 border-r min-h-[100px] justify-center gap-1 text-sm font-booking_font4 text-dark">
                      <Bed />
                      <div className="flex items-center gap-3">
                        <span className="text-base">{room?.bedroom} </span>
                        <span className="text-lg font-bold">Bedroom</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* room description */}
                <RoomTitleAndDescription room={room} />
                {/* room services */}
                <RoomFeatures />
              </div>
            </div>
            {/* <div className="w"></div> */}
            <RoomPaymentTab
              setAdults={setAdults}
              datemodal={datemodal}
              setDateModal={setDateModal}
              adults={adults}
              setChildrens={setChildrens}
              childrens={childrens}
              guestsmodal={guestsmodal}
              setGuestsModal={setGuestsModal}
              loginmodal={loginmodal}
              setLoginModal={setLoginModal}
              room={room}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomLists;
