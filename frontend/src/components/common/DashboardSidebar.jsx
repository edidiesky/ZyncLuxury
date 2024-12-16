 
import React, { useState } from "react";
import styled from "styled-components";
import { FiSettings } from "react-icons/fi";
import { LuBedDouble } from "react-icons/lu";
import { FaRegUser, FaHotel, FaMoneyBill } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout } from "lucide-react";
import { FaUsers } from "react-icons/fa";

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
];

const DashboardSidebar = () => {
  const { currentUser } = useSelector((store) => store.auth);
  const pathname = true;
  return (
    <HeaderStyles
      className={`w-[150px] bg-[#F3F3EE] lg:block hidden h-[100vh] overflow-auto sticky top-0`}
    >
      <div className="w-full h-full  py-4 justify-between flex items-center flex-col gap-4">
        <div className="w-full h-[90%] flex flex-col gap-4">
          <div className="flex px-4 w-full flex-col gap-4 items-start justify-between py-1">
            {/* <h4 className="text-sm text-[#000]">RockTrading</h4> */}
            <div className=" w-[90%] mx-auto relative flex gap-4 items-center justify-center">
              <Link
                to={"/"}
                className="w-full flex items-center justify-center gap-4 family2 text-lg text-white"
              >
                <img
                  src="https://avada.website/real-estate/wp-content/uploads/sites/176/2023/10/avada-real-estate-favicon.svg"
                  alt=""
                  className="w-8"
                />
                {/* ZyncLuxury */}
              </Link>
            </div>
            {/* <div
              className="py-2 rounded-md w-full px-3 font-normal
                     text-white flex items-center cursor-pointer gap-4 hover:bg-[#282c2b]"
            >
              <div className="w-8 h-8 rounded-md flex gap-4 items-center justify-center text-white text-sm bg-[#A1718A]">
                {currentUser?.name?.split("")[0]}
              </div>
              <span className="text-sm family2">
                {currentUser?.name}
                <span className="text-xs block font-normal text-[#969A9A]">
                  Admin
                </span>
              </span>
            </div> */}
          </div>
          <div className="w-full mt-2 family1 flex flex-col">
            {AdminSidebarData?.map((x, index) => {
              // console.log(pathname, `/dashboard${x.tab.path}`);
              return (
                <div key={index} className="w-[100%] text-sm mx-auto">
                  <NavLink
                    // activeClassName="active"
                    end
                    className={`flex tab text-[#000] py-3 flex-col regular w-full items-center gap-3`}
                    to={`/dashboard${x.tab.path}`}
                  >
                    <span className="text-lg md:text-xl rounded-full flex items-center justify-center">
                      {x?.tab?.icon}
                    </span>{" "}
                    <span className="flex-1 text-xs uppercase">
                      {x?.tab?.title}
                    </span>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full items-start justify-between py-1">
          <div className="w-[90%] mx-auto flex flex-col gap-4">
            {/* <NavLink
              // activeClassName="active"
              end
              className={`flex tab py-3 text-[#000] flex-col regular w-full items-center gap-3`}
              to={`/dashboard/profile/${currentUser?.id}`}
            >
              <span className="text-lg md:text-xl rounded-full flex items-center justify-center">
                <FiSettings fontSize={"20px"} />
              </span>

              {<span className="">Settings</span>}
            </NavLink> */}

            <div className="py-2 rounded-md w-full px-3 font-normal justify-center text-white flex items-center cursor-pointer gap-4 hover:bg-[#ededea]">
              <div
                className="w-14 h-14 rounded-full flex gap-4 items-center justify-center
               text-white text-lg lg:text-xl bg-[#A1718A]"
              >
                {currentUser?.name?.split("")[0]}
              </div>
              {/* <span className="text-sm family2">
                {currentUser?.name}
                <span className="text-xs block font-normal text-[#969A9A]">
                  Admin
                </span>
              </span> */}
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
    &:hover {
      background: #ededea;
      color: #333;
    }
    .nav_icons:hover {
      svg {
        color: #333;
      }
    }
    &.active {
      position: relative;
      background-color: #ededea;
      border-right: 3px solid #000;
      color: #333;

      .nav_icons {
        color: #333;
      }

      span {
        svg {
          color: #333;
        }
      }
    }
  }
`;

export default DashboardSidebar;
