"use client";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { HiBars3BottomRight } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AnimateText from "@/animations/AnimateText";
import { ClearUserInfo } from "@/features/auth/authSlice";
import { onLoginModal } from "@/features/modals/modalSlice";
const linkData = [
  {
    title: "Home",
    path: "",
  },
  {
    title: "Rooms",
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

const Navbar = () => {
  const [bar, setBar] = React.useState(false);
  const { currentUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(ClearUserInfo());
    window.location.reload();
  };
  return (
    <>
      <div className="px-4 #fff z-[400000] border-b min-h-[85px] flex items-center justify-center">
        <div
          className="w-[95%] max-w-custom mx-auto z-40 flex items-center justify-between
       gap-12"
        >
          <Link to={"/"}>
            <img
              src="https://avada.website/real-estate/wp-content/uploads/sites/176/2023/10/avada-real-estate-favicon.svg"
              alt=""
              className="w-8"
            />
          </Link>

          {/* <div className="hidden flex-1 sm:flex items-center justify-center gap-6">
            <input
              type="text"
              placeholder="Search for homes"
              className="inputs text-base font-semibold w-full rounded-full"
            />
          </div> */}
          <div className=" lg:flex hidden items-center gap-6">
            {linkData?.map((list, index) => {
              return (
                <NavLink
                  end
                  to={`/${list.path}`}
                  key={index}
                  className={`text-base hover:text-grey font-normal family1 text-dark flex items-center
                     gap-2 p-3 px-3 rounded-[40px]`}
                >
                  {/* <img src={list?.icon} className="w-4" alt="" /> */}
                  {list?.title}
                </NavLink>
              );
            })}
          </div>
          <div className="flex items-center justify-end gap-4">
            {currentUser ? (
              // <div className="flex p-4 min-w-[100px] items-center gap-2">
              //   {currentUser?.image ? (
              //     <img
              //       src={currentUser?.image}
              //       alt=""
              //       className="w-12 lg:w-14 h-12 lg:h-14 rounded-full"
              //     />
              //   ) : currentUser?.username ? (
              //     // <div className="w-12 h-12 text-white rounded-full bg-[#000] text-2xl flex items-center justify-center ">
              //     //   {currentUser?.username[0]}{" "}
              //     // </div>
              //     <img
              //       src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
              //       alt=""
              //       className="w-12 lg:w-14 h-12 lg:h-14 rounded-full"
              //     />
              //   ) : (
              //     <img
              //       src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
              //       alt=""
              //       className="w-12 lg:w-14 h-12 lg:h-14 rounded-full"
              //     />
              //   )}
              // </div>
              <ProfileDropdownStyles className="z-[30000000000000] relative flex items-end justify-end gap-4">
                {/* <div className="w-12 lg:w-12 h-12 lg:h-12 rounded-full bg-[#000] flex items-center justify-center text-2xl text-white">
                <BiCart />
              </div> */}
                {currentUser ? (
                  <div className="flex items-center gap-2">
                    <div className="flex profile_wrapper relative items-center justify-end gap-2">
                      <div className="profile_dropdown shadow absolute">
                        <div className="w-full flex flex-col">
                          <div className="p-4 border-b flex items-center gap-4">
                            {currentUser?.image ? (
                              <img
                                src={currentUser?.image}
                                alt=""
                                className="w-12 lg:w-14 h-12 lg:h-14 rounded-full"
                              />
                            ) : (
                              <img
                                src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                                alt=""
                                className="w-12 lg:w-14 h-12 lg:h-14 rounded-full"
                              />
                            )}
                            <h4 className="text-base text-dark font-bold family1">
                              {currentUser?.name}
                              <span className="block font-normal family1 text-xs text-dark">
                                {currentUser?.role === "SELLER"
                                  ? "Seller"
                                  : "Personal"}{" "}
                                Account
                              </span>
                            </h4>
                          </div>
                          {currentUser?.role === "SELLER" ? (
                            <div className="flex profile_dropdown_bottom flex-col w-full">
                              <Link
                                to={"/dashboard"}
                                className="font-booking_font_bold items-center gap-3 text-xl font-semibold p-2 family1 w-full profile_list border-b text-dark flex"
                              >
                                Dashboard
                              </Link>
                              <Link
                                to={"/dashboard/settings"}
                                className="font-booking_font_bold items-center gap-3 text-xl font-semibold p-2 family1 w-full profile_list border-b text-dark flex"
                              >
                                Profile
                              </Link>
                              <div
                                onClick={() => handleLogOut()}
                                className="font-booking_font_bold items-center gap-3 text-xl font-semibold p-2 family1 w-full profile_list border-b text-dark flex"
                              >
                                Log Out
                              </div>
                            </div>
                          ) : currentUser?.email ? (
                            <div className="flex profile_dropdown_bottom flex-col w-full">
                              <Link
                                to={"/trips"}
                                className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list border-b text-dark block"
                              >
                                Orders
                              </Link>
                              <Link
                                to={"/savedhomes"}
                                className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list border-b text-dark block"
                              >
                                Favourites
                              </Link>
                              <div
                                onClick={() => handleLogOut()}
                                className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list border-b text-dark block"
                              >
                                Log Out
                              </div>
                            </div>
                          ) : (
                            <div className="flex profile_dropdown_bottom flex-col w-full">
                              <div
                                onClick={() => dispatch(onRegisterModal())}
                                className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list border-b text-dark block"
                              >
                                Sign Up
                              </div>
                              <div
                                onClick={() => dispatch(onLoginModal())}
                                className="font-booking_font_bold text-xl font-semibold p-2 family1 w-full profile_list border-b text-dark block"
                              >
                                Sign In
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex min-w-[50px] md:min-w-[80px] items-center gap-2">
                        {currentUser?.image ? (
                          <img
                            src={currentUser?.image}
                            alt=""
                            className="w-12 lg:w-14 h-12 lg:h-14 rounded-full"
                          />
                        ) : currentUser?.username ? (
                          // <div className="w-12 h-12 text-white rounded-full bg-[#000] text-2xl flex items-center justify-center ">
                          //   {currentUser?.username[0]}{" "}
                          // </div>
                          <img
                            src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                            alt=""
                            className="w-12 lg:w-14 h-12 lg:h-14 rounded-full"
                          />
                        ) : (
                          <img
                            src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
                            alt=""
                            className="w-12 lg:w-14 h-12 lg:h-14 rounded-full"
                          />
                        )}
                        {/* {currentUser && (
                        <h4 className="text-base hidden lg:block family1 text-[#fff] family1">
                          {currentUser?.username}
                          <span className="block font-normal family1 text-xs text-[var(--grey-1)]">
                            {currentUser?.email}
                          </span>
                        </h4>
                      )} */}
                      </div>
                    </div>
                    <span
                      onClick={() => setBar(true)}
                      className="flex text-3xl text-[#000] lg:hidden"
                    >
                      <HiBars3BottomRight />
                    </span>
                  </div>
                ) : (
                  <span className="flex items-center gap-4">
                    {/* <div
                    onClick={() => dispatch(onLoginModal())}
                    className="btn text-xs text-center p-4 font-booking_font4 text-white px-6 rounded-[40px]"
                  >
                    <AnimateText children={" Book Your Stay"} />
                  </div> */}
                    <span
                      onClick={() => setBar(true)}
                      className="flex text-4xl cursor-pointer text-[#fff] lg:hidden"
                    >
                      <HiBars3BottomRight />
                    </span>
                  </span>
                )}
              </ProfileDropdownStyles>
            ) : (
              <div className="flex justify-end items-center">
                <button
                  onClick={() => dispatch(onLoginModal())}
                  className="btn min-w-[120px] text-center text-base family1 font-semibold text-white px-6 py-3"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
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
    </>
  );
};

export const ProfileDropdownStyles = styled.div`
  z-index: 40000 !important;
  .profile_wrapper:hover .profile_dropdown {
    opacity: 1;
    transform: scale(1);
    visibility: visible;
  }
  .profile_dropdown {
    width: 230px;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.3s;
    overflow: hidden;
    visibility: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.08);

    background: #fff;
    top: 100%;
    right: 0%;
    border-radius: 10px;
    .profile_card {
      padding: 1.3rem 1.5rem;

      cursor: pointer;
    }
  }
  .profile_list {
    padding: 10px 2rem;
    font-size: 14px;
    transition: all 0.3s;
    cursor: pointer;

    &:nth-last-child() {
      border-bottom: none;
    }
    &:hover {
      background: #eee;
    }
  }
  .dropdown {
    max-height: 0;
    transition: all 0.7s;
    /* min-height: 0; */
    &.active {
      max-height: 450px;
      /* min-height: 100px; */
    }
  }
`;

export default Navbar;
