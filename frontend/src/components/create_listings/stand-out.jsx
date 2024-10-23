import React from "react";
import styled from "styled-components";
import FooterHosting from "./footer";
import { useSelector } from "react-redux";
export default function StandOut() {
  const { userInfo } = useSelector((store) => store.user);
  return (
    <>
      <StandOutContainer className="w-90 auto">
        <div className="hidden w-100">
          <div
            data-aos="fade-up"
            data-aos-duration="1400"
            className="aboutCenter flex item-center gap-3 justify-center w-85 auto"
          >
            <div className="aboutC_right flex gap-1 column flex-1">
              <h1 className=" text-extra-bold text-dark">
                <span className="block fs-20 py-1">Step 2</span>
                Make your place stand out
              </h1>
              <span className="block fs-18 text-light text-dark">
                In this step, you’ll add some of the amenities your place
                offers, plus 5 or more photos. Then, you’ll create a title and
                description.
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
        </div>
      </StandOutContainer>
      <FooterHosting
      active={true}
        prev={`${userInfo?._id}/floor-plan`}
        next={`${userInfo?._id}/photos`}
      />
    </>
  );
}

const StandOutContainer = styled.div`
  overflow: hidden;
  padding-bottom: 6rem;
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
  span {
    @media (max-width: 580px) {
      font-size: 16px;
    }
  }
  h1 {
    font-size: 55px;
    line-height: 1.1;
    @media (max-width: 980px) {
      font-size: 40px;
    }
    @media (max-width: 780px) {
      font-size: 30px;
    }
    @media (max-width: 580px) {
      width: 90%;
      font-size: 26px;
    }
  }
`;
