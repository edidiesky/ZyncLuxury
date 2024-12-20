import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FooterHosting from "./footer";
import { useSelector } from "react-redux";
export default function Starting() {
  const { currentUser } = useSelector((store) => store.auth);
  return (
    <>
      <StartingContainer>
        <div
        
          className="authCenter flex items-center gap-3 justify-center w-[90%]  max-w-custom mx-auto"
        >
          <div className="flex-1 flex flex-col ">
            <h1 className="family2 text-dark">
              It’s easy to get started on Zyncluxury
            </h1>
          </div>{" "}
          <div className=" flex flex-col flex-1">
            <div className="flex items-center w-full gap-3">
              <div className="list1 flex item-start gap-3 text-lg family2 text-dark">
                1{" "}
                <div className="flex-1">
                  {" "}
                  Tell us about your place{" "}
                  <span className="block text-sm regular text-grey">
                    Share some basic info, like where it is and how many guests
                    can stay.
                  </span>
                </div>
              </div>{" "}
              <img
                src="https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg"
                alt=""
                className="image"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="list1 flex item-start gap-3 text-lg family2 text-dark">
                2{" "}
                <div className="flex-1">
                  {" "}
                  Make it stand out
                  <span className="block text-sm regular text-grey">
                    Add 5 or more photos plus a title and description—we’ll help
                    you out.
                  </span>
                </div>
              </div>{" "}
              <img
                src="https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg"
                alt=""
                className="image"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="list1 flex item-start gap-3 text-lg family2 text-dark">
                3{" "}
                <div className="flex-1">
                  {" "}
                  Finish up and publish
                  <span className="block text-sm regular text-grey">
                    Choose if you'd like to start with an experienced guest, set
                    a starting price, and publish your listing.
                  </span>
                </div>
              </div>
              <img
                src="https://a0.muscache.com/4ea/air/v2/pictures/c0634c73-9109-4710-8968-3e927df1191c.jpg"
                alt=""
                active={true}
                className="image"
              />
            </div>
          </div>
        </div>
      </StartingContainer>
      <FooterHosting
        next={`${currentUser?.id}/about-your-place`}
        text={"Get Started"}
        prev={""}
        active={true}
      />
    </>
  );
}

const StartingContainer = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom: 10rem;
  .list1 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 2rem 0;
  }
  .authCenter {
    @media (max-width: 980px) {
      flex-direction: column;
      gap: 2rem;
      align-items: flex-start;
    }
  }
  .image {
    width: 7rem;
  }
  h1 {
    font-size: 50px;
    line-height: 1.2;
    @media (max-width: 980px) {
      font-size: 40px;
      width: 100%;
      text-align: start;
    }
  }
`;
