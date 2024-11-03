import React, { useEffect, useRef } from "react";

import { BiCheck, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import RoomCard from "../../common/RoomCard";
import { getAllRooms } from "../../../features/room/roomReducer";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { slideup, clipPathLeft, smallslideup2 } from "@/constants/utils/framer";

import { Link } from "react-router-dom";
import Hero from "../hero";
import Listing from "../Listing";
import About from "../About";
import RecentListing from "../RecentListing";
import Expert from "../Expert";
import Choice from "../Choice";
import Blog from "../Blog";
const MainContent = () => {
  return (
    <div
      data-scroll-section
      className="w-full overflow-hidden flex flex-col"
    >
      <Hero />
      <Listing />
      <About />
      <RecentListing />
      <Expert/>
      <Blog/>
      {/* <Choice/> */}
    
    </div>
  );
};


const RoomsPrice = () => {
  const roompriceData = [
    {
      title: "Single Room",
      background: "var(-white-1)",
      price: "70,000",
      amenties: [
        "Home Screen",
        "PS5 Console",
        "Walk in Closets",
        "Fibre Optic Networks",
        "DSTV, Showmax, and Netflix",
        "Gated and Secured Estates",
        "Fully Furnished Kitchen",
      ],
    },
    {
      title: "Small Suite",
      background: "var(-gold-1)",
      price: "90,000",
      amenties: [
        "Home Screen",
        "24 / 7 Power Supply",
        "PS5 Console",
        "Walk in Closets",
        "Fibre Optic Networks",
        "DSTV, Showmax, and Netflix",
        "Gated and Secured Estates",
        "Fully Furnished Kitchen",
      ],
    },
    {
      title: "Apartment",
      background: "var(-white-1)",
      price: "120,000",
      amenties: [
        "Home Screen",
        "24 / 7 Power Supply",
        "PS5 Console",
        "Walk in Closets",
        "Fibre Optic Networks",
        "DSTV, Showmax, and Netflix",
        "Gated and Secured Estates",
        "Fully Furnished Kitchen",
        "Spacious Compound",
        "House Keeping",
      ],
    },
  ];
  const price_ref_1 = useRef(null);
  const image_ref_1 = useRef(null);
  const inView1 = useInView(price_ref_1, {
    margin: "0px 100px -120px 0px",
  });

  const inView2 = useInView(image_ref_1, {
    margin: "0px 100px -120px 0px",
  });
  return (
    <div
      data-scroll-section
      className="w-full min-h-[100vh] py-40 relative flex items-center justify-center gap-8"
    >
      <img
        src="/images/hazel_11.jpeg"
        alt=""
        className="w-full h-full absolute top-0 left-0 object-cover"
      />
      <div className="w-full h-full z-30 bg-[rgba(0,0,0,.5)] absolute top-0 left-0"></div>
      <div
        className="w-full z-40 flex items-center justify-center flex-col
       gap-16"
      >
        <h1
          ref={price_ref_1}
          className="text-white text-center leading-[1.3] text-6xl md:text-7xl font-booking_font4 family2"
        >
          <span
            style={{ letterSpacing: "4px" }}
            className="text-xs pb-6 text-center font-semibold uppercase block font-booking_font"
          >
            <span className="w-full gap-x-[5px] flex justify-center items-center flex-wrap ">
              {["OUR", "ROOM", "Prices"].map((x, index) => {
                return (
                  <span
                    key={index}
                    className="flex hide relative items-center justify-start"
                  >
                    <motion.span
                      variants={slideup}
                      custom={index}
                      initial="initial"
                      animate={inView1 ? "animate" : "exit"}
                    >
                      {x}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          </span>
          <span className="w-full gap-x-[8px] flex justify-center items-center flex-wrap ">
            {["The", "", "Best", "", "Prices"].map((x, index) => {
              return (
                <span
                  key={index}
                  className="flex hide relative items-center justify-start"
                >
                  <motion.span
                    variants={slideup}
                    custom={index}
                    initial="initial"
                    animate={inView1 ? "animate" : "exit"}
                  >
                    {x}
                  </motion.span>
                </span>
              );
            })}
          </span>
        </h1>

        <div
          ref={image_ref_1}
          className="w-[90%] max-w-custom_1 mx-auto py-4 lg:flex-row gap-4 flex-col items-start justify-center flex"
        >
          {roompriceData.map((room, index) => {
            return (
              <motion.div
                key={index}
                variants={smallslideup2}
                custom={index}
                initial="initial"
                animate={inView2 ? "animate" : "exit"}
                className={`w-full ${index === 1 ? "bg-[#101727] text-white" : "bg-white"
                  } flex items-center shadow-2xl justify-center rounded-[20px] flex-col gap-8`}
              >
                <div className="w-full flex flex-col gap-3 px-8">
                  <h3
                    className={`${index === 1 ? "text-[#B7FF0A]" : "b"}
                     text-xl font-booking_font_bold family2`}
                  >
                    {room?.title}
                  </h3>
                  <h3 className="text-4xl md:text-5xl font-booking_font4 family2">
                    <span className="text-xl">₦</span>
                    {room?.price}
                    <span className="pl-3 text-xl font-booking_font">
                      / night
                    </span>
                  </h3>
                  <div className="w-full">
                    <div
                      className="btn family2 btn_2 flex items-center justify-center
                     py-4 mt-6 px-8 rounded-[40px] w-full text-lg"
                    >
                      <AnimateText children={"Get Started Now!"} />
                    </div>
                  </div>
                </div>
                <div
                  className={`w-full ${index === 1
                      ? "border-[rgba(255,255,255,.2)]"
                      : "border-[rgba(0,0,0,.2)]"
                    } pt-6 border-t px-8 flex flex-col gap-12`}
                >
                  <div className="w-full flex flex-col gap-8">
                    <h3
                      className={`${index === 1 ? "text-[#fff]" : "text-dark"}
                     text-xl font-booking_font family2`}
                    >
                      Features
                    </h3>
                    <div className="flex flex-col gap-4">
                      {room.amenties.map((am, index) => {
                        return (
                          <div
                            key={index}
                            className="w-full flex items-center gap-4 text-base"
                          >
                            <div
                              className="w-6 text-xm bg-[#B7FF0A] h-6 flex 
                        items-center justify-center text-[#000] rounded-full"
                            >
                              {" "}
                              <BiCheck />{" "}
                            </div>
                            {am}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
