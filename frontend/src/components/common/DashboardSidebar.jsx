import React, { useState } from "react";
import styled from "styled-components";
import { FiSettings } from "react-icons/fi";
import { LuBedDouble } from "react-icons/lu";
import { FaRegUser, FaHotel, FaMoneyBill } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout } from "lucide-react";
import { AdminSidebarData } from "@/constants/data/dashboard";

const DashboardSidebar = () => {
  const { currentUser } = useSelector((store) => store.auth);
  return (
    <HeaderStyles
      className={`w-[320px] border-r lg:block hidden h-[100vh] overflow-auto sticky top-0`}
    >
      <div className="w-full h-full py-4 px-2 justify-between flex items-center flex-col gap-4">
        <div className="w-full h-[90%] flex flex-col gap-10">
          <div className="flex px-4 w-full flex-col gap-4 items-start justify-between py-1">
            {/* <h4 className="text-sm text-[#000]">RockTrading</h4> */}
            <div className=" w-[100%] mx-auto relative flex gap-4 items-center justify-center">
              <Link
                to={"/"}
                className="w-full font-bold flex items-center gap-4 text-xl lg:text-xl text-[#000]"
              >
                <img
                  src="https://avada.website/real-estate/wp-content/uploads/sites/176/2023/10/avada-real-estate-favicon.svg"
                  alt=""
                  className="w-10"
                />
                ZyncLuxury
              </Link>
            </div>
          </div>
          <div className="w-full mt-2 family1 flex flex-col gap-3">
            {AdminSidebarData?.map((x, index) => {
              return (
                <div key={index} className="w-[95%] text-base mx-auto">
                  <NavLink
                    end
                    className={`flex tab py-2 hover:text-white medium text-[#969a9acb] rounded-full px-3 hover:bg-[#d1d5db83] w-full items-center gap-4`}
                    to={`${x.tab.path}`}
                  >
                    <span className="text-xl">{x?.tab?.icon}</span>{" "}
                    <span className="flex-1">{x?.tab?.title}</span>
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
              className={`flex tab family1 py-3 hover:text-white text-[#969a9acb] text-sm
                                 rounded-full px-3 hover:bg-[#d1d5db83] w-full items-center gap-4`}
              to={`/dashboard/profile/${currentUser?.id}`}
            >
              <span className="text-lg md:text-xl rounded-full flex items-center justify-center">
                <FiSettings fontSize={"20px"} />
              </span>

              {<span className="">Settings</span>}
            </NavLink>

            <div className="py-2 rounded-full w-full px-3 font-normal text-dark flex items-center cursor-pointer gap-4 hover:bg-[#d1d5db83]">
              <div className="w-10 h-10 rounded-full flex gap-4 items-center justify-center text-dark text-sm bg-[#A1718A]">
                {currentUser?.name?.split("")[0]}
              </div>
              <span className="text-base family2">
                {currentUser?.name}
                <span className="text-xs block font-normal text-[#969A9A]">
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
      background: #d1d5db83;
      color: #000;
    }
    .nav_icons:hover {
      svg {
        color: #000;
      }
    }
    &.active {
      position: relative;
      background: #d1d5db83;
      color: #000;

      .nav_icons {
        color: #000;
      }

      span {
        svg {
          color: #000;
        }
      }
    }
  }
`;

export default DashboardSidebar;
