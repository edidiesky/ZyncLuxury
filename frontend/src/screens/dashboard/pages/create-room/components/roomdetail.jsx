"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateRoom,
  getSingleRooms,
  UpdateRoom,
} from "@/features/room/roomReducer";
import Loader from "@/components/home/loader";
const RoomDetail = ({
  title,
  bathrooms,
  shortdescription,
  price,
  images,
  rooms,
  cautionfee,
  handleRoomCreation
}) => {
  const dispatch = useDispatch();
  const {
    creatingRoomisLoading,
    updateRoomisSuccess,
    creatingRoomisSuccess,
    updateRoomisLoading,
    room,
  } = useSelector((store) => store.room);
  return (
    <div className="w-full bg-[#fff]  family1 border p-6 rounded-[10px]">
      <div className="w-full flex flex-col gap-4">
        <h4 className="text-xl font-semibold">Preview</h4>
        <div className="w-full flex flex-col gap-4">
          {images?.length > 0 ? (
            <img
              alt="Cotion"
              loading="lazy"
              style={{
                transition:
                  "filter 0.2s cubic-bezier(0.4, 0, 0.2, 1), -webkit-filter 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              src={images[0]}
              className="w-full h-[200px] rounded-lg object-cover hover:grayscale-[1] grayscale-0"
            />
          ) : (
            <>
              <div className="w-full h-[100px] bg-[#fafafa] border"></div>
            </>
          )}

          <div className="w-full flex flex-col gap-2">
            <h3 className="text-sm text-text_dark_1 ">
              Title:{" "}
              <span className="family1 font-semibold text-xl"> {title}</span>
            </h3>
            <div className="w-full flex flex-col gap-2">
              <h4
                style={{ letterSpacing: "2px" }}
                className="text-sm flex items-center text-dark "
              >
                Price:{" "}
                <span className="text-lg family1 font-semibold">₦{Number(price).toLocaleString()}</span>
              </h4>
              {/* cautionfee */}
              <h4
                style={{ letterSpacing: "2px" }}
                className="text-sm flex items-center text-dark "
              >
                Caution Fee:{" "}
                <span className="text-lg family1 font-semibold">₦{Number(cautionfee).toLocaleString()}</span>
              </h4>
              <h4
                style={{ letterSpacing: "2px" }}
                className="text-sm flex items-center text-dark "
              >
                Rooms:{" "}
                <span className="text-lg family1 font-semibold"> {rooms}</span>{" "}
              </h4>
              <h4
                style={{ letterSpacing: "2px" }}
                className="text-sm flex items-center text-dark "
              >
                BathRooms:{" "}
                <span className="text-lg family1 font-semibold"> {bathrooms}</span>{" "}
              </h4>
            </div>
          </div>
        </div>
        <button
          disabled={creatingRoomisLoading || updateRoomisLoading}
          onClick={handleRoomCreation}
          className="btn text-base p-3  px-8 text-white rounded-[40px]"
        >
          {creatingRoomisLoading || updateRoomisLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader type="dots" />
              {room ? " Updating in progress" : "Room Creating"}
            </span>
          ) : (
            <>{room ? "Update Room" : "Create Room"}</>
          )}
        </button>
      </div>
    </div>
  );
};

export default RoomDetail;
