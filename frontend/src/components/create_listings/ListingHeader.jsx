import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import Logo2 from "../common/svg/Logo12";
import { Link, NavLink } from "react-router-dom";
import Logo from "../common/svg/Logo";
import Dropdown from "../common/Dropdown";
import { useSelector } from "react-redux";
import { BiSearch } from "react-icons/bi";

const sidebarData = [
  {
    id: 1,
    title: "Listings",
    path: "",
  },
  {
    id: 2,
    title: "Reviews",
    path: "Reviews",
  },
  { id: 4, title: "Reservations", path: "reservations" },

  { id: 5, title: "Earnings", path: "earning" },
  { id: 6, title: "Inbox", path: "Profile" },
  { id: 6, title: "Order", path: "orders" },
];
export default function ListingHeader({ type }) {
  const [drop, setDrop] = useState(false);
  const { userInfo } = useSelector((store) => store.user);

  if (type === "dashboard") {
    return (
      <>
        <ListingHeaderContainer className="type w-100">
          <div className="aboutCenter flex item-center gap-3 justify-space auto">
            {/* <div className="flex-1"></div> */}
            <div className="flex">
              <form className="flex item-center form">
                <BiSearch />
                <input
                  type="text"
                  placeholder="Search Listings"
                  className="search_input"
                />
              </form>
            </div>
            <div className="w-100 flex-1 relative flex item-center justify-end">
              <div className="flex top item-center gap-1 justify-end">
                {/* <AnimatePresence
                initial="false"
                exitBeforeEnter={true}
                onExitComplete={() => null}
              >
                {drop && (
                  <Dropdown setDrop={setDrop} drop={drop} type={"type"} />
                )}
              </AnimatePresence> */}
                <div
                  onClick={() => setDrop(!drop)}
                  style={{
                    width: "2.7rem",
                    height: "2.7rem",
                    borderRadius: "50%",
                    background: "rgba(0,0,0,.1)",
                    color: "#Fff",
                  }}
                  className="profile_wrapper flex item-center justify-center"
                >
                  <div
                    style={{
                      width: "2.4rem",
                      height: "2.4rem",
                      borderRadius: "50%",
                      background: "#000",
                      color: "#Fff",
                      border: "2px solid #fff",
                    }}
                    className="fs-16 text-white flex item-center justify-center"
                  >
                    {userInfo?.firstname.charAt(0)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ListingHeaderContainer>
      </>
    );
  }
  if (type === "account") {
    return (
      <>
        {drop && (
          <div
            onClick={() => setDrop(false)}
            className="backdrop_dropdown absolute"
            style={{
              height: "100vh",
              width: "100vw",
              position: "absolute",
              zIndex: "1",
            }}
          ></div>
        )}
        <ListingHeaderContainer className="type">
          <div className="aboutCenter flex item-center gap-3 justify-space w-85 auto">
            <Link to={"/"}>
              <Logo />
            </Link>
            <div className="flex top item-center gap-1 justify-end">
              <Dropdown setDrop={setDrop} drop={drop} type={"type"} />
              <div
                onClick={() => setDrop(!drop)}
                style={{
                  width: "2.7rem",
                  height: "2.7rem",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,.1)",
                  color: "#Fff",
                }}
                className="profile_wrapper flex item-center justify-center"
              >
                <div
                  style={{
                    width: "2.4rem",
                    height: "2.4rem",
                    borderRadius: "50%",
                    background: "#000",
                    color: "#Fff",
                    border: "2px solid #fff",
                  }}
                  className="fs-16 text-white flex item-center justify-center"
                >
                  {userInfo?.firstname.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </ListingHeaderContainer>
      </>
    );
  }
  return (
    <>
      <ListingHeaderContainer>
        <div className="aboutCenter flex item-center gap-3 justify-center w-85 auto">
          <Logo2 />
          <div className="flex top item-center gap-1 justify-end w-100">
            <div className="headBtn fs-14 text-dark text-bold">Questions</div>
            <div className="headBtn fs-14 text-dark text-bold">Save & Exit</div>
          </div>
        </div>
      </ListingHeaderContainer>
    </>
  );
}

const ListingHeaderContainer = styled.div`
  width: 100%;
  padding: 1rem 0;
  top: 0;
  position: sticky;
  z-index: 300;
  background-color: #fff;
  .form {
    width: 400px;
    /* background-color: red; */
    position: relative;
    svg {
      /* transform: translateX(170%); */
      font-size: 20px;
      position: absolute;
      left: 4%;
      color: var(--grey-1);
    }
    .search_input {
      width: 100%;
      border: none;
      outline: none;
      background-color: #f7f7f7;
      padding: 16px 40px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 40px;
      font-family: inherit;
      font-size: 14px;
      color: var(--dark-1);
      &:hover {
        border: 1px solid rgba(0, 0, 0, 1);
      }
    }
  }
  .list {
    @media (max-width: 780px) {
      display: none;
    }
  }
  .dropdown {
    position: absolute;
    right: 3%;
    background-color: #fff;
    min-width: 240px;
    padding: 0.5rem 0;
    z-index: 200000;
    border-radius: 12px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    @media (min-width: 1807px) {
      right: 17%;
    }
    .li {
      padding: 0.7rem 1.3rem;
      cursor: pointer;
      border-radius: inherit;
      &:hover {
        background-color: #f7f7f7;
      }
      /* border-bottom: 1px solid rgba(0, 0, 0, 0.07); */
    }
  }

  &.type {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .profile_wrapper {
    transition: all 0.5s;
    &:hover {
      transform: scale(1.1);
    }
  }
  .top {
    position: relative;
    @media (max-width: 780px) {
      justify-content: flex-start;
    }
  }
  .aboutCenter {
    width: 90%;
    justify-content: space-between;
    @media (max-width: 780px) {
      /* flex-direction: column; */
      /* align-items: flex-start; */
      gap: 1rem;
      justify-content: space-between;
    }
  }

  .headBtn {
    border: 1px solid rgba(0, 0, 0, 0.4);
    padding: 0.6rem 1.7rem;
    border-radius: 40px;
  }
`;
