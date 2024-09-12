"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { FiSettings } from "react-icons/fi";
import { LuBedDouble } from "react-icons/lu";
import { FaRegUser, FaHotel, FaMoneyBill } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout } from "lucide-react";

const AdminSidebarData = [
  {
    id: 1,
    tab: {
      title: "Dashboard",
      path: "",
      icon: <Layout fontSize={"16px"} />,
    },
    list: [],
  },
  {
    id: 6,
    tab: {
      icon: <LuBedDouble fontSize={"16px"} />,
      title: "Reservations",
      path: "/reservation",
    },
    list: [],
  },

  {
    id: 61,
    tab: {
      icon: <FaHotel fontSize={"16px"} />,
      title: "Rooms",
      path: "/rooms",
    },
    list: [],
  },
  {
    id: 6,
    tab: {
      icon: <FaMoneyBill fontSize={"16px"} />,
      title: "Transactions",
      path: "/orders",
    },
    list: [],
  },

  {
    id: 4,
    tab: {
      icon: <FaRegUser fontSize={"16px"} />,
      title: "Clients",
      path: "/customers",
    },
    list: [],
  },
];

const DashboardSidebar = () => {
  const { currentUser } = useSelector((store) => store.auth);
  const pathname = true;
  return (
    <HeaderStyles
      className={`w-[280px] overflow-hidden border-[rgba(0,0,0,.1)] border-r bg-[#fff] hidden lg:flex  column gap-2`}
    >
      <div className="w-full h-full py-4 justify-between flex items-center flex-col gap-4">
        <div className="w-full h-[90%] pb-4 border-b flex flex-col gap-4">
          <div className="flex px-4 w-full flex-col  items-start justify-between py-1">
            {/* <h4 className="text-sm text-[#000]">RockTrading</h4> */}
            <div className=" w-[90%] mx-auto relative flex gap-4 items-center flex-col justify-between">
              <Link to={"/"} className="w-full flex">
                <img
                  src="https://avada.website/real-estate/wp-content/uploads/sites/176/2023/10/avada-real-estate-favicon.svg"
                  alt=""
                  className="w-10"
                />
              </Link>
            </div>
          </div>
          <div className="w-full px-2 my-4 flex flex-col gap-1">
            {AdminSidebarData?.map((x, index) => {
              // console.log(pathname, `/dashboard${x.tab.path}`);
              return (
                <div
                  key={index}
                  className="w-[95%] font-normal family1 text-xs mx-auto"
                >
                  <NavLink
                    // activeClassName="active"
                    end
                    className={`w-F7F8FC tab
                      text-sm px-2 mx-auto text-[#000]`}
                    to={`/dashboard${x.tab.path}`}
                  >
                    <div className="flex font-normal items-center group-hover:justify-start w-full">
                      <span
                        className="w-12 h-12 text-xs rounded-xl flex items-center text-dark
                       justify-center"
                      >
                        {" "}
                        {x.tab.icon}
                      </span>
                      {<span className="">{x.tab?.title}</span>}
                    </div>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full items-start justify-between py-1">
          <div className="w-[90%] mx-auto flex flex-col gap-4">
            <NavLink
              // activeClassName="active"
              end
              className={`text-sm tab flex group-hover:justify-start font-normal items-center gap-4 p-[12px] px-4 text-[#000] family1`}
              to={`/dashboard/profile/${currentUser?.id}`}
            >
              <FiSettings fontSize={"24px"} />

              {<span className="">Settings</span>}
            </NavLink>
            <div className=" w-full relative px-2 flex gap-1 items-center justify-between">
              <div className="flex flex-1 gap-2 items-center group-hover:justify-start">
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
                <h4 className="text-base  text-[#000] font-normal">
                  {currentUser?.name}
                  <span className="block font-booking_font text-xs font-normal text-grey">
                    {currentUser?.email}
                  </span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
};

export const HeaderStyles = styled.div`
  /* width: 100px; */
  /* z-index: 3000000; */
  position: sticky;
  top: 0%;
  height: 100vh;
  .dropdown {
    max-height: 0;
    transition: all 0.7s;
    &.active {
      max-height: 450px;
      /* min-height: 100px; */
    }
  }

  .tab {
    margin: 0 auto;
    border-radius: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
    &:hover {
      background: #e2e2e2;
      color: #000;
      svg {
        color: #000;
      }
    }
    &.active {
      position: relative;
      background: #f1f1f1;
      color: #000;

      span {
        svg {
          color: #000;
        }
      }
    }
  }
`;

export default DashboardSidebar;
