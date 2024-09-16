import React, { useEffect, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import moment from "moment";
import AnimateText from "@/animations/AnimateText";
import { RxCross1 } from "react-icons/rx";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { BiCheck, BiChevronDown, BiChevronUp, BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { ClearUserInfo } from "@/features/auth/authSlice";
import { onLoginModal } from "@/features/modals/modalSlice";
import { Link, NavLink } from "react-router-dom";

import { addDays } from "date-fns";
import Dash from "@/assets/svg/dash";
import { ProfileDropdownStyles } from "../common/navbar";
import { countries } from "@/data/countries";
import Profile from "../common/Profile";

const linkData = [
  {
    title: "Home",
    path: "",
  },
  {
    title: "Our Listings",
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

  // {
  //   title: "Contact",
  //   path: "trips",
  // },
];
const Hero = () => {
  const [bar, setBar] = React.useState(false);

  const { currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  return (
    <>
      <div className="w-full">
        <div
          data-scroll-section
          className="w-full min-h-[700px] z-30 py-40 relative flex items-center justify-center gap-8"
        >
          <img
            src="/hero.jpg"
            alt=""
            className="w-full h-full absolute z-20 object-cover"
          />
          <div className="w-full h-full absolute z-30 bg-[rgba(0,0,0,.5)]"></div>

          <TopContent bar={bar} setBar={setBar} currentUser={currentUser} />

          <div
            className="w-[90%] max-w-custom py-12 md:py-20 mx-auto lg:px-4 z-40 flex md:items-center md:justify-center flex-col
       gap-6 md:gap-12"
          >
            <h1
              className="text-white md:text-center capitalize font-bold leading-[1.1] lg:leading-[1.3] text-5xl sm:text-6xl
          family2"
            >
              Where Serenity Meets{" "}
              <span className="relative">
                Adventure:
                <Dash />
              </span>{" "}
              <br /> Book Your Resort Experience
              <span className="text-base lg:text-xl max-w-[400px] md:max-w-[680px] text-[#c5c3c3] md:mx-auto font-normal capitalize pt-2 block family1">
                We are experts who set the pace Inspiring homes beyond
                boundaries. We help you get the best out of your finance in
                getting a home
              </span>
            </h1>
            <div className="w-full md:items-center flex-row md:justify-center gap-4 flex">
              <div className="flex">
                <Link
                  to={"/search"}
                  className="btn md:text-lg text-base family1 font-semibold text-white rounded-[40px] px-6 py-4 md:px-12 md:py-6"
                >
                  <AnimateText children={"Book Your Home"} />
                </Link>
              </div>

              <div className="flex items-center">
                <Link
                  to={"/search"}
                  className="btn btn_2 md:text-lg text-base family1 font-semibold text-white px-6 py-4 md:px-12 md:py-6"
                >
                  <AnimateText children={"Learn More"} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <SearchHomes />
        </div>
      </div>
      <Sidebar bar={bar} setBar={setBar} currentUser={currentUser} />
    </>
  );
};

const SearchHomes = () => {
  const today = new Date();
  const [guests, setGuests] = React.useState(2);
  const [newcountrylist, setNewCountryList] = React.useState([]);
  const [country, setCountry] = React.useState("");
  const [countrymodal, setCountryModal] = React.useState(false);
  const [date, setDate] = React.useState({
    from: today,
    to: addDays(today, 3),
  });
  const startdate = date?.from;
  const enddate = date?.to;
  let date1 = moment(startdate);
  let date2 = moment(enddate);
  const differenceInDays = date2?.diff(date1, "days"); // Convert milliseconds to days

  const handleCountryData = (e) => {
    const newcountry = countries?.filter((data) =>
      data.toLowerCase().includes(country.toLowerCase())
    );
    setNewCountryList(newcountry);
  };

  useEffect(() => {
    if (country) {
      handleCountryData();
    }
  }, [country]);

  // console.log(newcountrylist);
  return (
    <div className="w-full -mt-20">
      <div className="max-w-[1200px] w-[90%] rounded-[20px] mx-auto py-8 lg:flex-row min-h-[160px] bg-white shadows z-40  relative flex-col items-center justify-center flex">
        <div
          onClick={() => setCountryModal(false)}
          className="flex flex-col md:px-4 gap-4 w-full"
        >
          <div className="p-4 rounded-full flex-wrap  flex items-center gap-4">
            <div className="py-3 px-6 text-center rounded-full bg-gray-200 text-dark font-bold text-sm">
              All Accomodations
            </div>
            {/* <div className="py-3 px-6 md:flex-1 text-center rounded-full text-dark font-bold text-sm">
             Villa
            </div>
            <div className="py-3 px-6 md:flex-1 text-center rounded-full text-dark font-bold text-sm">
             Hotel
            </div>
            <div className="py-3 px-6 md:flex-1 text-center rounded-full text-dark font-bold text-sm">
           Apartment
            </div> */}
          </div>
          <div className="w-full px-8 flex flex-wrap md:flex-nowrap items-start gap-4">
            <div className="flex flex-col relative md:w-1/4 gap-2 text-base font-bold">
              <span>Location</span>
              <input
                type="text"
                value={country}
                name="country"
                onChange={(e) => {
                  // handleCountryData(e);
                  setCountry(e.target.value);
                  setCountryModal(true);
                }}
                placeholder="Type the destination"
                className="w-full rounded-md inputs text-dark font-normal text-sm"
              />
              {countrymodal && (
                <div className="absolute top-[110%] rounded-xl overflow-hidden border flex flex-col bg-white shadow-lg">
                  <div className="flex max-h-[250px] overflow-auto w-full min-w-[200px]  flex-col ">
                    {newcountrylist?.map((data, index) => {
                      return (
                        <span
                          onClick={() => {
                            setCountry(data);
                            setCountryModal(false);
                          }}
                          key={index}
                          className="text-sm cursor-pointer font-semibold py-3 px-4 hover:bg-[#f7f7f7]"
                        >
                          {data}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <Popover>
              {" "}
              <PopoverTrigger>
                <div className="lg:w-[500px] flex items-start gap-4">
                  <div className="flex flex-col w-full items-start gap-2 text-base font-bold">
                    <span>Check In</span>
                    <input
                      type="text"
                      placeholder="Add Date"
                      value={moment(startdate)?.format("DD MMMM YYYY")}
                      className="w-full rounded-md inputs text-dark font-normal text-sm"
                    />
                  </div>
                  <div className="flex flex-col w-full items-start gap-2 text-base font-bold">
                    <span>Check Out</span>
                    <input
                      type="text"
                      placeholder="Add Date"
                      value={moment(enddate)?.format("DD MMMM YYYY")}
                      className="w-full rounded-md inputs text-dark font-normal text-sm"
                    />
                  </div>
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
            <div className="flex md:w-1/4 flex-col gap-2 text-base font-bold">
              <span>Participant</span>
              <input
                type="text"
                placeholder="Add Guests"
                className="w-full rounded-md inputs text-dark font-normal text-sm"
              />
            </div>
          </div>
          <div className="w-full px-4 flex items-center md:justify-end">
            <button className="btn text-white flex items-center gap-4 family1 font-bold px-6 text-sm lg:text-base lg:px-8 py-4">
              <BiSearch /> Search for Accomodations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ bar, setBar, currentUser }) => {
  return (
    <div
      style={{ zIndex: "200" }}
      className={`${
        bar ? "left-0" : "-left-[100%]"
      } w-[300px] h-full transition-all ease duration-700 fixed flex lg:hidden top-0 shadow-2xl column gap-2`}
    >
      <div
        style={{
          background: "#22253d",
        }}
        className="w-full h-full z-30 absolute top-0 left-0"
      ></div>
      <div
        onClick={() => setBar(!bar)}
        style={{ zIndex: "100" }}
        className={`${
          bar ? "left-0" : "-left-[100%]"
        } w-full h-full transition-all ease duration-300 fixed flex lg:hidden top-0 bg-[#424242b0] column gap-2`}
      ></div>

      <div
        style={{ zIndex: "200" }}
        className="w-full Header_wrapper bg-[#22253d] shadows border-r border-[#22253d] h-full  flex item-center flex-col gap-4"
      >
        {currentUser && (
          <div className="flex p-4 items-center gap-2">
            {currentUser?.image ? (
              <img
                src={currentUser?.image}
                alt=""
                className="w-12 lg:w-12 h-12 lg:h-12 rounded-full"
              />
            ) : currentUser?.username ? (
              // <div className="w-12 h-12 text-white rounded-full bg-[#000] text-2xl flex items-center justify-center ">
              //   {currentUser?.username[0]}{" "}
              // </div>
              <img
                src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                alt=""
                className="w-12 lg:w-12 h-12 lg:h-12 rounded-full"
              />
            ) : (
              <img
                src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                alt=""
                className="w-12 lg:w-12 h-12 lg:h-12 rounded-full"
              />
            )}
            {currentUser && (
              <h4 className="text-base font-bold font-booking_font4 text-[#fff] family1">
                {currentUser?.name}
                <span className="block font-normal font-booking_font text-sm text-grey">
                  {currentUser?.email}
                </span>
              </h4>
            )}
          </div>
        )}
        <ul className="flex flex-col w-full">
          {currentUser
            ? linkData?.slice(0, 6)?.map((x, index) => {
                return (
                  <Link
                    to={`/${x.path}`}
                    key={index}
                    className="text-[#fff] font-booking_font4
                        hover:bg-[#42424227] py-[20px] border-b border-[#424242a8] text-sm px-8"
                  >
                    {x.title}
                  </Link>
                );
              })
            : linkData?.map((x, index) => {
                return (
                  <Link
                    to={`/${x.path}`}
                    key={index}
                    className="text-[#fff] font-booking_font4  hover:bg-[#42424227] py-[20px] border-b border-[#42424299] text-sm px-8"
                  >
                    {x.title}
                  </Link>
                );
              })}
        </ul>
      </div>
    </div>
  );
};

const TopContent = ({ bar, setBar, currentUser }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full z-[40000] absolute top-0 left-0 py-8">
      <div
        className="w-[95%] max-w-custom mx-auto lg:px-4 z-40 flex items-center justify-between
       gap-12"
      >
        <div className="flex items-center gap-2">
          <h4 className="family2 text-2xl md:text-2xl uppercase font-bold text-white">
            ZyncLuxury
          </h4>
        </div>

        <div className="hidden lg:flex items-center justify-center gap-2">
          {linkData?.map((list, index) => {
            return (
              <NavLink
                end
                to={`/${list.path}`}
                key={index}
                className={`text-base hover:text-grey font-semibold family1 text-white flex items-center
                     gap-2 p-3 px-3 rounded-[40px]`}
              >
                {/* <img src={list?.icon} className="w-4" alt="" /> */}
                <AnimateText children={list?.title} />
              </NavLink>
            );
          })}
        </div>
        <div className=" items-center z-[40000000] flex justify-end">
          {currentUser ? (
            <Profile setBar={setBar} />
          ) : (
            <div className="flex justify-end items-center">
              <button
                onClick={() => dispatch(onLoginModal())}
                className="btn min-w-[130px] text-center text-base family1 font-semibold text-white px-8 py-4"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
