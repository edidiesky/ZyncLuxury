"use client";
import styled from "styled-components";
import { RxCross1 } from "react-icons/rx";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { FaBars, FaMoneyBill1 } from "react-icons/fa6";
import { FaRegUser, FaHotel, FaMoneyBill } from "react-icons/fa";
import { TiHome, TiMessage } from "react-icons/ti";
// import { usePathname } from "next/navigation";
import { RxTimer } from "react-icons/rx";
import { LuBedDouble } from "react-icons/lu";
import { BiChart, BiSearch } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearUserInfo } from "@/features/auth/authSlice";
import { Bell } from "lucide-react";
import NotificationSidebar from "./NotificationSidebar";
import Profile from "./Profile";
const AdminSidebarData = [
  {
    id: 6,
    tab: {
      icon: <LuBedDouble fontSize={"14px"} />,
      title: "Reservations",
      path: "reservation",
    },
    list: [],
  },
  {
    id: 1,
    tab: {
      title: "Overview",
      path: "",
      icon: <BiChart fontSize={"20px"} />,
    },
    list: [],
  },
  {
    id: 61,
    tab: {
      icon: <FaHotel fontSize={"14px"} />,
      title: "Rooms",
      path: "/rooms",
    },
    list: [],
  },
  {
    id: 6,
    tab: {
      icon: <FaMoneyBill1 fontSize={"14px"} />,
      title: "Transactions",
      path: "/orders",
    },
    list: [],
  },

  {
    id: 4,
    tab: {
      icon: <FaRegUser fontSize={"14px"} />,
      title: "Clients",
      path: "/customers",
    },
    list: [],
  },
];

const DashboardHeader = () => {
  const { currentUser } = useSelector((store) => store.auth);
  const [bar, setBar] = React.useState(false);
  const [notificationactivebar, setNotificationActiveBar] =
    React.useState(false);
  const [activeindex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(ClearUserInfo("any"));
    window.location.reload();
  };
  const { Notifications } = useSelector((store) => store.notification);
  const unReadNotifications = Notifications?.filter(
    (data) => data.read === false
  );

  // console.log(unReadNotifications)
  return (
    <>
      {/* <NotificationSidebar
        setNotificationActiveBar={setNotificationActiveBar}
        notificationactivebar={notificationactivebar}
      /> */}
      <HeaderStyles
        style={{
          backdropFilter: "blur(14px)",
        }}
        className="w-full z-[10] min-h-[80px] sticky family1 top-0 bg-[#ffffff9d] py-8 px-2 flex items-center 
      justify-center"
      >
        <div className="Header_wrapper w-[95%] mx-auto max-w-custom flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              onClick={() => setBar(!bar)}
              className="flex flex-1 lg:hidden gap-4 items-center justify-start text-dark"
            >
              {bar ? (
                <RxCross1 fontSize={"30px"} />
              ) : (
                <HiBars3BottomLeft fontSize={"30px"} />
              )}
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold">
              Hello {currentUser?.username}
              <span className="block text-base font-light">
                Explore information and activity about your property
              </span>
            </h3>

            {/* <label
              htmlFor=""
              className="hidden md:flex text-xl text-dark w-[200px] lg:w-[250px]
             items-center gap-2 h-14 border rounded-[10px] bg-[#f9f9f9] px-4"
            >
              <div className=" text-dark flex items-center justify-center">
                <BiSearch />
              </div>
              <input
                type="text"
                placeholder="Search dashboard"
                className="bg-transparent font-booking_font_bold border-none outline-none text-base text-grey flex-1"
              />
            </label> */}
          </div>
          <div className="flex flex-1 auto items-center justify-end gap-4">
            <div
              onClick={() => setNotificationActiveBar(true)}
              className="w-10 md:w-14 hover:bg-[#f7f7f7] relative cursor-pointer h-10 md:h-14 rounded-full flex items-center justify-center text-lg"
            >
              <Bell />
              {unReadNotifications?.length !== 0 && (
                <div className="w-6 h-6 rounded-full text-sm flex items-center text-[#fff] justify-center absolute top-1 right-2 bg-[#249f26]">
                  {unReadNotifications?.length}
                </div>
              )}
            </div>
            <Profile />
          </div>
        </div>
        <Sidebar bar={bar} setBar={setBar} />
      </HeaderStyles>
    </>
  );
};

const Sidebar = ({ bar, setBar }) => {
  const { currentUser } = useSelector((store) => store.auth);
  return (
    <div
      style={{ zIndex: "200" }}
      className={`${
        bar ? "left-0" : "-left-[100%]"
      } w-[300px] bg-[#151515] border-r shadow-2xl  h-full transition-all ease duration-700 fixed flex lg:hidden top-0 flex-col gap-2`}
    >
      <div
        onClick={() => setBar(!bar)}
        style={{ zIndex: "200" }}
        className={`${
          bar ? "left-0" : "-left-[100%]"
        } w-full h-full transition-all ease duration-300 fixed flex lg:hidden top-0 bg-[#42424227] flex-col gap-2`}
      ></div>
      {/* <div className="w-full h-full absolute bg-[#fff] z-[24] object-cover" /> */}
      <div
        style={{ zIndex: "200" }}
        className="w-full h-full bg-[#151515] Header_wrapper py-4 flex items-start flex-col gap-2"
      >
        <div className="flex px-3 items-center gap-2">
          {currentUser?.image ? (
            <img
              src={currentUser?.image}
              alt=""
              className="w-14 lg:w-14 h-14 lg:h-14 rounded-full"
            />
          ) : currentUser?.username ? (
            // <div className="w-14 h-14 text-white rounded-full bg-[#000] text-2xl flex items-center justify-center ">
            //   {currentUser?.username[0]}{" "}
            // </div>
            <img
              src="https://fundednext.fra1.digitaloceanspaces.com/dashboard/demo-avatar.jpg"
              alt=""
              className="w-14 lg:w-14 h-14 lg:h-14 rounded-full"
            />
          ) : (
            ""
          )}
          <h4 className="text-base font-booking_font4 text-white">
            {currentUser?.username}
            <span className="block font-normal font-booking_font text-sm text-white">
              {currentUser?.email}
            </span>
          </h4>
        </div>
        <div className="w-full my-4 flex flex-col">
          {AdminSidebarData?.map((x, index) => {
            return (
              <div key={index} className="w-full mx-auto">
                <NavLink
                  onClick={() => setBar(!bar)}
                  end
                  className={`
                      text-xm w-[90%] mx-auto text-white font-booking_font4`}
                  to={`/dashboard${x.tab.path}`}
                >
                  <div className="flex items-center">
                    <span className="w-14 h-14 text-lg rounded-xl flex items-center text-blue justify-center">
                      {" "}
                      {x.tab.icon}
                    </span>
                    {<h4>{x.tab?.title}</h4>}
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const HeaderStyles = styled.div`
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
    z-index: 220;
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
  a,
  .tab {
    padding: 7px 14px;
    margin: 0 auto;
    border-radius: 4px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
    svg {
      color: #fff;
    }

    &:hover {
      background: #3a614a2c;
      color: #000;

      svg {
        color: #fff;
      }
    }
    &.active {
      position: relative;
      background: #3a614a;
      color: #fff;
      svg {
        color: #fff;
      }
    }
  }
`;

export default DashboardHeader;
