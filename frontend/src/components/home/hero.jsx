import React, { useEffect, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import moment from "moment";
import AnimateText from "@/animations/AnimateText";
import { BiCheck, BiChevronDown, BiChevronUp } from "react-icons/bi";

import { Link, NavLink } from "react-router-dom";

import { addDays } from "date-fns";
import Dash from "@/assets/svg/dash";

const linkData = [
  {
    title: "Home",
    path: "",
  },
  {
    title: "Our Lisitings",
    path: "search",
  },
  {
    title: "My Favourites",
    path: "savedhomes",
  },
  {
    title: "My Trips",
    path: "trips",
  },

  {
    title: "Contact",
    path: "trips",
  },
];
const Hero = () => {
  const today = new Date();
  const [guests, setGuests] = React.useState(2);
  const [date, setDate] = React.useState({
    from: today,
    to: addDays(today, 3),
  });
  const startdate = date?.from;
  const enddate = date?.to;
  let date1 = moment(startdate);
  let date2 = moment(enddate);
  const differenceInDays = date2?.diff(date1, "days"); // Convert milliseconds to days
  // console.log(moment(startdate)?.date());

  return (
    <div className="w-full">
      <div
        data-scroll-section
        className="w-full min-h-[700px] z-30 py-40 relative flex items-center justify-center
   gap-8"
      >
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgb(255 255 255 / 0%) 0%, rgb(13 32 135 / 90%) 100%), url(https://avada.website/real-estate/wp-content/uploads/sites/176/2023/09/dream-houses.jpg)",
          }}
          className="w-full h-full z-30 absolute top-0 left-0"
        ></div>
        <div className="w-full z-40 absolute top-0 left-0 py-8">
          <div
            className="w-[95%] max-w-custom mx-auto lg:px-4 z-40 flex items-center justify-between
       gap-12"
          >
            <h4 className="family2 text-2xl text-white">ZyncLuxury</h4>

            <div className="hidden lg:flex items-center justify-center gap-2">
              {linkData?.map((list, index) => {
                return (
                  <NavLink
                    end
                    to={`/${list.path}`}
                    key={index}
                    className={`text-lg hover:text-grey font-bold family1 text-white flex items-center
                     gap-2 p-3 px-3 rounded-[40px]`}
                  >
                    {/* <img src={list?.icon} className="w-4" alt="" /> */}
                    <AnimateText children={list?.title} />
                  </NavLink>
                );
              })}
            </div>
            <Link
              to={"/search"}
              className="btn btn_2 text-lg family1 font-semibold text-white px-8 py-4"
            >
              <AnimateText children={"Sign Up"} />
            </Link>
          </div>
        </div>
        <div
          className="w-[90%] max-w-custom mx-auto lg:px-4 z-40 flex items-center justify-center flex-col
       gap-12"
        >
          <h1
            className="text-white text-center capitalize leading-[1.1] lg:leading-[1.3] text-5xl lg:text-6xl
          family2"
          >
            Where Serenity Meets{" "}
            <span className="relative">
              Adventure:
              <Dash />
            </span>{" "}
            <br /> Book Your Resort Experience
            <span className="text-xl lg:text-2xl font-semibold capitalize pt-8 block family1">
              We set the pace Inspiring homes beyond boundaries
            </span>
          </h1>
          <div className="w-full items-center lg:flex-row flex-col justify-center gap-4 flex">
            <Link
              to={"/search"}
              className="btn text-lg family1 font-semibold text-white rounded-[40px] px-12 py-6"
            >
              <AnimateText children={"Book Your Home"} />
            </Link>

            <Link
              to={"/search"}
              className="btn btn_2 text-lg family1 font-semibold text-white px-12 py-6"
            >
              <AnimateText children={"Learn More"} />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="max-w-[1100px] w-[90%] rounded-[20px] mx-auto py-4 lg:flex-row -mt-20 min-h-[160px] bg-white shadows z-40  relative flex-col items-center justify-center flex">
          <div className="p-8 bg-white flex gap-8 lg:flex-row flex-col lg:items-center justify-center">
            <Popover>
              <PopoverTrigger>
                <div className="w-full flex lg:flex-row lg:items-center gap-3">
                  <span className="pr-3 lg:pr-8 border-r flex flex-col gap-4">
                    <span
                      style={{ letterSpacing: "4px" }}
                      className="text-[10px] lg:text-xs block uppercase leading-[1.5] text-center text-dark font-normal"
                    >
                      CHECK IN
                    </span>

                    <div className="flex items-center gap-2">
                      <span
                        style={{ letterSpacing: "4px" }}
                        className="text-3xl pt-3 lg:text-4xl block font-booking_font4 font-bold uppercase leading-[1.5] text-center text-dark"
                      >
                        {moment(startdate)?.date()}
                      </span>
                      <span
                        style={{ letterSpacing: "4px" }}
                        className="text-[10px] lg:text-xs uppercase leading-[1.5] flex flex-col text-dark font-normal"
                      >
                        {moment(startdate).format("MMM").toUpperCase()}
                        <BiChevronDown fontSize={"24px"} />
                      </span>
                    </div>
                  </span>
                  <span className="px-4 lg:px-8 border-r flex flex-col gap-4">
                    <span
                      style={{ letterSpacing: "4px" }}
                      className="text-[10px] lg:text-xs block uppercase leading-[1.5] text-center text-dark font-normal"
                    >
                      CHECK OUT
                    </span>

                    <div className="flex items-center gap-2">
                      <span
                        style={{ letterSpacing: "4px" }}
                        className="text-3xl pt-3 lg:text-4xl block font-booking_font4 font-bold uppercase leading-[1.5] text-center text-dark"
                      >
                        {moment(enddate)?.date()}
                      </span>
                      <span
                        style={{ letterSpacing: "4px" }}
                        className="text-[10px] lg:text-xs uppercase leading-[1.5] flex flex-col text-dark font-normal"
                      >
                        {moment(enddate).format("MMM").toUpperCase()}
                        <BiChevronDown fontSize={"24px"} />
                      </span>
                    </div>
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <div className="flex items-center gap-4">
              <span className="px-4 lg:px-8">
                <span
                  style={{ letterSpacing: "4px" }}
                  className="text-[10px] lg:text-xs block uppercase leading-[1.5] text-center text-dark font-normal"
                >
                  Guests
                </span>

                <div className="flex pt-1 items-center gap-2">
                  <span
                    style={{ letterSpacing: "4px" }}
                    className="text-3xl pt-3 lg:text-4xl block font-booking_font4 font-bold uppercase leading-[1.5] text-center text-dark"
                  >
                    {guests}
                  </span>
                  <span
                    style={{ letterSpacing: "4px" }}
                    className="text-[8px] uppercase leading-[1.5] flex flex-col gap-[4px] text-dark font-normal"
                  >
                    <button
                      disabled={guests === 1}
                      onClick={() => setGuests(guests - 1)}
                      className="w-8 hover:bg-[#eee] rounded-full cursor-pointer h-8 flex items-center justify-center"
                    >
                      <BiChevronDown fontSize={"16px"} />
                    </button>
                    <button
                      disabled={guests === 4}
                      onClick={() => setGuests(guests + 1)}
                      className="w-8 hover:bg-[#eee] rounded-full cursor-pointer h-8 flex items-center justify-center"
                    >
                      <BiChevronUp fontSize={"16px"} />
                    </button>
                    {/* <BiChevronUp fontSize={"16px"} /> */}
                  </span>
                </div>
              </span>
              <button className="btn text-white family1 font-bold px-6 text-sm lg:text-base lg:px-12 py-4 lg:py-6">
                Search for Homes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Hero;
