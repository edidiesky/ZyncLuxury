import React from "react";
import styled from "styled-components";
import FooterHosting from "./footer";
import { useSelector } from "react-redux";
import Star from "../common/svg/star";
export default function ReviewOfPlace() {
  const { currentUser } = useSelector((store) => store.auth);
  const { GigsDetails } = useSelector((store) => store.room);
  return (
    <>
      <ReviewOfPlaceContainer className="flex flex-col gap-2 w-[90%]  max-w-custom mx-auto">
        <div className="w-[90%]  max-w-custom mx-auto flex flex-col gap-2">
          {" "}
          <h2 className="family2 w-[90%]  max-w-custom mx-auto w-full text-start text-dark">
            Review your listing
            <span className="block py-1text-lg regular text-grey">
              Here's what we'll show to guests. Make sure everything looks good.
            </span>
          </h2>
          <div className="ReviewOfCenter flex item-start gap-4 justify-start w-90 auto">
            <div className="authC_right flex flex-col flex-1 gap-1">
              <img
                src={GigsDetails?.image[0]}
                alt=""
                className="image"
              />
              <div className="flex flex-col">
                <h4 className="fs-16 family2 w-full flex items-center justify-between">
                  {GigsDetails?.title}
                  <Star />
                </h4>
                <h5 className="fs-16family2 text-dark">
                  ${GigsDetails?.price}{" "}
                  <span className="regular fs-14">night</span>
                </h5>
              </div>
            </div>{" "}
            <div className="flex flex-col flex-1">
              <h3 className="fs-30 family2">What's next?</h3>
              <div className="list1text-lg family2 text-dark">
                Confirm a few details and publish{" "}
                <span className="block fs-14 regular text-grey">
                  We’ll let you know if you need to verify your identity or
                  register with the local government.
                </span>
              </div>
              <div className="list1text-lg family2 text-dark">
                Set up your calendar{" "}
                <span className="block fs-14 regular text-grey">
                  Choose which dates your listing is available. It will be
                  visible 20 hours after you publish.
                </span>
              </div>
              <div className="list1text-lg family2 text-dark">
                Adjust your settings
                <span className="block fs-14 regular text-grey">
                  Set house rules, select a cancellation policy, choose how
                  guests book, and more.
                </span>
              </div>
            </div>
          </div>
        </div>
      </ReviewOfPlaceContainer>
      <FooterHosting
        next={`${currentUser?.id}/price`}
        prev={`${currentUser?.id}/price`}
      />
    </>
  );
}

const ReviewOfPlaceContainer = styled.div`
  /* width: 100%;
  overflow: hidden; */
  padding-bottom: 10rem;
  .image {
    width: 100%;
    height: 90%;
    border-radius: inherit;
  }
  .authC_right {
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
    padding: 1.4rem 1rem;
    border-radius: 15px;
  }
  .list1 {
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */
    padding: 0.5rem 0;
  }
  .ReviewOfCenter {
    @media (max-width: 780px) {
      flex-direction: column;
      gap: 2rem;
      width: 100%;
    }
  }
  .image {
    width: 100%;
    object-fit: cover;
  }
  h2 {
    font-size: 45px;
    line-height: 1.2;
    @media (max-width: 980px) {
      font-size: 40px;
    }
  }
`;
