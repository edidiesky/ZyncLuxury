"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUpload from "./imageUpload";
import Roomfeatures from "./roomfeatures";

const RoomForms = ({
  title,
  setRooms,
  rooms,
  setBathRooms,
  bathrooms,
  setTitle,
  description,
  setDescription,
  price,
  setPrice,
  setImages,
  images,
  setFeatures,
  features,
  amenities,
  setAmenities,
  setAddress,
  city,
  setCity,
  address,
  cautionfee,
  setCautionFee,
  setGuests,
  guests
}) => {
  const handleFeatureSelection = (data) => {
    if (features.includes(data)) {
      const newdata = features.filter((x) => x?.title !== data?.title);
      setFeatures(newdata);
    } else {
      setFeatures([...features, data]);
    }
  };
  const module = {
    toolbar: [["bold", "italic"], ['link']]
  }
  return (
    <div className="w-full flex flex-col gap-8">
      {/* title */}
      <div className="w-full bg-[#fff] border py-8 px-2 rounded-[10px]">
        <div className="w-[90%] mx-auto flex flex-col gap-8">
          <div className="w-full flex items-center justify-between">
            <h4 className="text-2xl font-booking_font4 font-bold">Name & Description</h4>
            <div className="flex items-center justify-end">
              <Link
                to={"/dashboard/rooms"}
                className="p-2 px-4 cursor-pointer hover:bg-[#fafafa] border rounded-lg font-booking_font_bold text-base flex items-center justify-center gap-2"
              >
                Go Back
              </Link>
            </div>
          </div>
          <div className="pt-4 w-full flex flex-col gap-4">
            <label
              htmlFor="title"
              className="text-sm  flex flex-col gap-2 font-booking_font4 font-bold"
            >
              Product Title
              <input
                name="title"
                value={title}
                id="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                className="text-sm w-full inputs font-normal text-grey"
              />
            </label>
            <label
              htmlFor="description"
              className="text-sm h-[300px] flex flex-col gap-2 font-booking_font4 font-bold"
            >
              Product Description
              {/* <textarea
                name="description"
                value={description}
                id="description"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                className="text-sm w-full h-[250px]"
              /> */}
              <ReactQuill
                // modules={module}
                theme="snow"
                style={{
                  height: "200px",
                  borderRadius: "15px",
                  fontSize:"20px !important",
                  fontWeight:"500"
                }}
                value={description}
                onChange={setDescription}
              />
            </label>
          </div>
        </div>
      </div>
      <ImageUpload images={images} setImages={setImages} />
      {/* price */}
      <div className="w-full bg-[#fff] border p-6 px-2 rounded-[10px]">
        <div className="w-[95%] md:w-[90%] mx-auto flex flex-col gap-8">
          <div className="w-full flex items-center justify-between">
            <h4 className="text-2xl font-booking_font4 font-bold">
              Price & Room Capacity
              <span className="font-normal font-booking_font text-base block">
                Share what makes your place special.
              </span>
            </h4>
          </div>
          <div className="pt-2 w-full flex flex-col gap-4">
            <label
              htmlFor="price"
              className="text-sm  flex flex-col gap-2 font-booking_font4 font-bold"
            >
              Room Amount
              <input
                name="price"
                value={price}
                id="price"
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                className="text-sm w-full inputs font-normal text-grey"
              />
            </label>
            <label
              htmlFor="cautionfee"
              className="text-sm  flex flex-col gap-2 font-booking_font4 font-bold"
            >
              Room Caution Fee
              <input
                name="cautionfee"
                value={cautionfee}
                id="cautionfee"
                type="number"
                onChange={(e) => setCautionFee(e.target.value)}
                className="text-sm w-full inputs font-normal text-grey"
              />
            </label>
            <div className="w-full grid md:grid-cols-2 gap-4">
              <label
                htmlFor="rooms"
                className="text-sm  flex flex-col gap-2 font-booking_font4 font-bold"
              >
                Room Count
                <input
                  name="rooms"
                  value={rooms}
                  id="rooms"
                  type="number"
                  onChange={(e) => setRooms(parseFloat(e.target.value))}
                  className="text-sm w-full inputs font-normal text-grey"
                />
              </label>
              <label
                htmlFor="bathrooms"
                className="text-sm  flex flex-col gap-2 font-booking_font4 font-bold"
              >
                Bath-Room Count
                <input
                  name="bathrooms"
                  value={bathrooms}
                  id="bathrooms"
                  type="number"
                  onChange={(e) => setBathRooms(parseFloat(e.target.value))}
                  className="text-sm w-full inputs font-normal text-grey"
                />
              </label>
            </div>
            <label
                htmlFor="guests"
                className="text-sm  flex flex-col gap-2 font-booking_font4 font-bold"
              >
               Maximum Room Guests
                <input
                  name="guests"
                  value={guests}
                  id="guests"
                  type="number"
                  onChange={(e) => setGuests(parseFloat(e.target.value))}
                  className="text-sm w-full inputs font-normal text-grey"
                />
              </label>
          </div>
        </div>
      </div>

      {/* location, address, city */}
      <div className="w-full bg-[#fff] border p-6 px-2 rounded-[10px]">
        <div className="w-[95%] md:w-[90%] mx-auto flex flex-col gap-8">
          <div className="w-full flex items-center justify-between">
            <h4 className="text-2xl font-booking_font4 font-bold">
              Room Location
              <span className="font-normal font-booking_font text-base block">
                Share where your room is located.
              </span>
            </h4>
          </div>
          <div className="pt-2 w-full flex flex-col gap-4">
            <div className="w-full grid md:grid-cols-1 gap-4">
              <label
                htmlFor="city"
                className="text-sm  flex flex-col gap-2 font-booking_font4 font-bold"
              >
                Room City
                <input
                  name="city"
                  value={city}
                  id="city"
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
                  className="text-sm w-full inputs font-normal text-grey"
                />
              </label>
              {/* <label
                htmlFor="bathrooms"
                className="text-sm  flex flex-col gap-2 font-booking_font4 font-bold"
              >
                Room Address
                <input
                  name="address"
                  value={address}
                  id="address"
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  className="text-sm w-full inputs font-normal text-grey"
                />
              </label> */}
            </div>
          </div>
        </div>
      </div>

      {/* images */}
   

      {/* Room Attributes and Features */}
      <Roomfeatures
        features={features}
        handleFeatureSelection={handleFeatureSelection}
      />
    </div>
  );
};

export default RoomForms;
