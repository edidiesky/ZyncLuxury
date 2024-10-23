import React from "react";
import styled from "styled-components";
import FooterHosting from "./footer";
import { useSelector } from "react-redux";
export default function AboutPlace() {
  const { userInfo } = useSelector((store) => store.user);

  return (
    <>
      <AboutPlaceContainer>
        <div
          data-aos="fade-up"
          data-aos-duration="1400"
          className="aboutCenter flex item-center gap-3 justify-center w-85 auto"
        >
          <div className="aboutC_right flex column flex-1">
            <h1 className=" text-extra-bold text-dark">
              <span className="block fs-20">Step 1</span>
              Tell us about your place
            </h1>
            <span className="block py-1 fs-18 text-light text-dark">
              In this step, we'll ask you which type of property you have and if
              guests will book the entire place or just a room. Then let us know
              the location and how many guests can stay.
            </span>
          </div>{" "}
          <div className="aboutC_right flex item-center justify-center flex-1">
            <img
              src="https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg"
              alt=""
              className="image"
            />
          </div>
        </div>
      </AboutPlaceContainer>

      <FooterHosting
        active={true}
        next={`${userInfo?._id}/structure`}
        prev={"overview"}
      />
    </>
  );
}

const AboutPlaceContainer = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom: 6rem;
  @media (max-width: 580px) {
    padding-top: 5rem;
  }
  .list1 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 2rem 0;
  }
  .aboutCenter {
    @media (max-width: 780px) {
      flex-direction: column;
      gap: 2rem;
    }
  }
  .image {
    object-fit: cover;
    width: 300px;
    @media (max-width: 580px) {
      width: 90%;
    }
  }
  h1 {
    font-size: 50px;
    line-height: 1.2;
    @media (max-width: 780px) {
      font-size: 40px;
    }
    @media (max-width: 580px) {
      font-size: 30px;
    }
  }
`;
