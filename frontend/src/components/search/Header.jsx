import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { ProfileDropdownStyles } from "../common/navbar";
import { onLoginModal, onRegisterModal } from "@/features/modals/modalSlice";
import { HiBars3BottomRight } from "react-icons/hi2";
import Profile from "../common/Profile";
import { BiSearch } from "react-icons/bi";

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
const Header = () => {
  const [country, setCountry] = useState("");
  const [bar, setBar] = React.useState(false);
  const { currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(ClearUserInfo());
    window.location.reload(true);
  };
  return (
    <div className="h-[100%] md:h-[90px] w-full">
      <div className="bg-[#fff] py-6 w-full z-[6000] flex flex-col">
        <div
          className="w-[95%] max-w-custom z-[400] mx-auto flex items-center justify-between
       gap-12"
        >
          <div className="flex items-center gap-4 md:gap-6">
            <img
              src="https://avada.website/real-estate/wp-content/uploads/sites/176/2023/10/avada-real-estate-favicon.svg"
              alt=""
              className="w-8"
            />
            <label
              style={{
                transition: "all .4s",
              }}
              htmlFor="search"
              className="relative w-[200px] md:w-[400px]"
            >
              <input
                type="text"
                id="search"
                value={country}
                name="country"
                onChange={(e) => {
                  // handleCountryData(e);
                  setCountry(e.target.value);
                }}
                placeholder="New York (USA)"
                className="w-full  rounded-md bg-[#fafafa] inputs text-dark font-normal text-sm"
              />
              <div
                className="w-10 flex items-center justify-center text-lg
               h-10 rounded-full bg-[var(--primary)] text-white absolute right-5 top-2"
              >
                <BiSearch />
              </div>
            </label>
          </div>
          <div className="hidden lg:flex items-center justify-center gap-6">
            <div className=" lg:flex hidden items-center gap-6">
              {linkData?.map((list, index) => {
                return (
                  <NavLink
                    end
                    to={`/${list.path}`}
                    key={index}
                    className={`text-base hover:text-grey font-bold family1 text-dark flex items-center
                     gap-2 p-3 px-3 rounded-[40px]`}
                  >
                    {/* <img src={list?.icon} className="w-4" alt="" /> */}
                    {list?.title}
                  </NavLink>
                );
              })}
            </div>
            <div className=" items-center flex justify-end">
              {currentUser ? (
                <Profile />
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
      </div>
     
    </div>
  );
};

export const FilterRooms = ()=> {
  return (
    <div
    style={{
      backdropFilter:"blur(14px)"
    }}
    className="bg-[#ffffffb0] sticky top-0 z-[5000] shadow-md w-full flex flex-col py-4">
      <div
        className="w-[95%] max-w-custom mx-auto z-40 flex md:flex-row flex-col md:items-center justify-between
       gap-8"
      >
        <div className="flex items-center flex-wrap  gap-4">
          {/* Type */}
          <div className="relative">
            <div className="flex px-4 py-3 border rounded-full items-start gap-2 text-sm cursor-pointer font-bold">
              Property Type
            </div>
          </div>
          {/* price */}
          <div className="relative">
            <div className="flex px-4 py-3 border rounded-full items-start gap-2 text-sm cursor-pointer font-bold">
              Any Price
            </div>
          </div>
          {/* bedrooms */}
          <div className="relative">
            <div className="flex px-4 py-3 border rounded-full items-start gap-2 text-sm cursor-pointer font-bold">
              Bed
            </div>
          </div>

          {/* bathrooms */}
          <div className="relative">
            <div className="flex px-4 py-3 border rounded-full items-start gap-2 text-sm cursor-pointer font-bold">
              Bath Rooms
            </div>
          </div>
        </div>

        <div className=" px-4 flex items-center md:justify-end">
          <button className="btn text-white flex items-center gap-4 family1 font-bold px-6 text-sm lg:text-base lg:px-8 py-4">
            <BiSearch /> Search for Accomodations
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
