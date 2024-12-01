
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { HiBars3BottomRight } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ClearUserInfo } from "@/features/auth/authSlice";
import { onLoginModal } from "@/features/modals/modalSlice";
import Profile from "./Profile";
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
          <Link to={"/"} className="flex items-center gap-2">
            <img
              src="https://avada.website/real-estate/wp-content/uploads/sites/176/2023/10/avada-real-estate-favicon.svg"
              alt=""
              className="w-8"
            />
            <span className="text-2xl md:text-2xl family2 text-dark">
              ZyncLuxury
            </span>
          </Link>

          {/* <div className="hidden flex-1 sm:flex items-center justify-center gap-6">
            <input
              type="text"
              placeholder="Search for homes"
              className="inputs text-base w-full rounded-full"
            />
          </div> */}
          <div className=" lg:flex hidden items-center gap-6">
            {linkData?.map((list, index) => {
              return (
                <NavLink
                  end
                  to={`/${list.path}`}
                  key={index}
                  className={`text-base lg:text-lg hover:text-grey family2 text-dark flex items-center gap-2 p-3 px-3 rounded-[40px]`}
                >
                  {list?.title}
                </NavLink>
              );
            })}
          </div>
          <div className="flex items-center justify-end gap-4">
            {currentUser ? (
              <div className="flex items-center gap-8">
                <Link
                  to={`/become-a-host/${currentUser?.id}`}
                  className="btn text-center md:block hidden text-sm md:text-base regular text-white px-4 md:px-8 py-3"
                >
                  Host your Home
                </Link>
                <Profile setBar={setBar} />
              </div>
            ) : (
              <div className="flex justify-end items-center">
                <button
                  onClick={() => dispatch(onLoginModal())}
                  className="btn min-w-[120px] md:min-w-[140px] text-center text-base family1 text-white px-4 py-3"
                >
                 Get Started
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
          className="w-full Header_wrapper bg-[#22253d] shadows border-r border-[#22253d] h-full  flex items-center flex-col gap-4"
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
                <h4 className="text-base family2 font-booking_font4 text-[#fff] family1">
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
