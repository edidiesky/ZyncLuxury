import React, { useState } from "react";
import styled from "styled-components";
import { FiSettings } from "react-icons/fi";
import { LuBedDouble } from "react-icons/lu";
import { FaRegUser, FaHotel, FaMoneyBill } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout } from "lucide-react";
import { FaUsers } from "react-icons/fa";
import { PiReceiptBold } from "react-icons/pi";

const AdminSidebarData = [
  {
    id: 1,
    tab: {
      title: "Dashboard",
      path: "",
      icon: <Layout width={"20px"} />,
    },
    list: [],
  },
  {
    id: 6,
    tab: {
      icon: <LuBedDouble fontSize={"20px"} />,
      title: "Reservations",
      path: "/reservation",
    },
    list: [],
  },

  {
    id: 61,
    tab: {
      icon: <FaHotel fontSize={"20px"} />,
      title: "Rooms",
      path: "/rooms",
    },
    list: [],
  },
  {
    id: 6,
    tab: {
      icon: <FaMoneyBill fontSize={"20px"} />,
      title: "Transactions",
      path: "/orders",
    },
    list: [],
  },

  {
    id: 4,
    tab: {
      icon: <FaUsers fontSize={"24px"} />,
      title: "Clients",
      path: "/customers",
    },
    list: [],
  },
  {
    id: 4,
    tab: {
      icon: <PiReceiptBold fontSize={"24px"} />,
      title: "Receipts",
      path: "/receipts",
    },
    list: [],
  },
];

const DashboardSidebar = () => {
  const { currentUser } = useSelector((store) => store.auth);
  const pathname = true;
  return (
    <HeaderStyles
      className={`w-[320px] bg-[#121621] lg:block hidden h-[100vh] overflow-auto sticky top-0`}
    >
      <div className="w-full h-full  py-8 px-4 justify-between flex flex-col gap-4">
        <div className="w-full h-[90%] flex flex-col gap-4">
          <div className="flex w-full flex-col gap-4 items-start justify-between py-1">
            {/* <h4 className="text-sm text-[#000]">RockTrading</h4> */}
            <div className="relative flex gap-4 items-start">
              <Link
                to={"/"}
                className="w-full flex items-center justify-center gap-4 family2 text-xl text-white"
              >
                <img
                  src="https://avada.website/real-estate/wp-content/uploads/sites/176/2023/10/avada-real-estate-favicon.svg"
                  alt=""
                  className="w-6"
                />
                ZyncLuxury
              </Link>
            </div>
          </div>
          <div className="w-full mt-2 family1 gap-0.5 flex flex-col">
            {AdminSidebarData?.map((x, index) => {
              // console.log(pathname, `/dashboard${x.tab.path}`);
              return (
                <div key={index} className="w-[100%] text-sm mx-auto">
                  <NavLink
                    // activeClassName="active"
                    end
                    className={`flex tab py-3 px-4 rounded-lg family2 w-full items-center gap-3`}
                    to={`/dashboard${x.tab.path}`}
                  >
                    <span className="text-lg md:text-xl rounded-full flex items-center justify-center">
                      {x?.tab?.icon}
                    </span>{" "}
                    <span className="flex-1 text-lg">{x?.tab?.title}</span>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full items-start justify-between py-1">
          <div className="w-full flex flex-col gap-4">
            <NavLink
              // activeClassName="active"
              end
              className={`flex tab py-3 px-4 rounded-lg family2 w-full items-center gap-3`}
              to={`/dashboard/profile/${currentUser?.id}`}
            >
              <span className="text-lg md:text-xl rounded-full flex items-center justify-center">
                <FiSettings fontSize={"20px"} />
              </span>

              {<span className="flex-1 text-lg">Settings</span>}
            </NavLink>

            <div className="py-2 rounded-md w-full px-3 font-normal text-white flex items-center cursor-pointer gap-4 hover:bg-[#1f2222c8]">
              <div
                className="w-12 h-12 rounded-full flex gap-4 items-center justify-center
               text-white text-lg lg:text-xl bg-[#A1718A]"
              >
                {currentUser?.name?.split("")[0] || "AA"}
              </div>
              <span className="text-lg family2">
                {currentUser?.name || "Admin Admin"}
                <span className="text-sm block font-normal text-[#969A9A]">
                  Admin
                </span>
              </span>
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
    color: #969A9A;
    &:hover {
      background: #1f2222c8;
      color: #fff;
    }
    .nav_icons:hover {
      svg {
        color: #fff;
      }
    }
    &.active {
      position: relative;
      background-color: var(--primary);
      border-right: 3px solid #000;
      color: #fff;

      .nav_icons {
        color: #fff;
      }

      span {
        svg {
          color: #fff;
        }
      }
    }
  }
`;

export default DashboardSidebar;
