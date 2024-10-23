import React, { useEffect } from "react";
import styled from "styled-components";
import FooterHosting from "./footer";
import { useDispatch, useSelector } from "react-redux";
import Star from "@/assets/svg/star";
import { useParams } from "react-router-dom";
import { getSingleRooms } from "@/features/room/roomReducer";
import RoomCard from "../common/RoomCard";
export default function ReviewOfPlace() {
  const { apartmentid } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.auth);
  const { room } = useSelector((store) => store.room);
  useEffect(() => {
    if (apartmentid) {
      dispatch(getSingleRooms(apartmentid));
    }
  }, [apartmentid]);
  return (
    <>
      <ReviewOfPlaceContainer className="flex flex-col gap-2 w-[90%]  max-w-custom mx-auto">
        <div className="w-[90%]  max-w-custom mx-auto flex flex-col gap-12">
          {" "}
          <h2 className="family2 text-start text-dark">
            Review your listing
            <span className="block py-1 text-base md:text-lg regular text-grey">
              Here's what we'll show to guests. Make sure everything looks good.
            </span>
          </h2>
          <div className="grid md:grid-cols-custom item-start gap-12 justify-start auto">
            <div className="flex md:w-[380px] flex-col flex-1 gap-1">
              <RoomCard apartment={room} />
            </div>{" "}
            <div className="flex w-full flex-col flex-1 gap-6">
              <h3 className="text-2xl md:text-3xl family2">What's next?</h3>
              <div className="list text-lg md:text-xl family2 text-dark">
                Confirm a few details and publish{" "}
                <span className="block text-sm md:text-base regular text-grey">
                  We’ll let you know if you need to verify your identity or
                  register with the local government.
                </span>
              </div>
              <div className="list1 text-lg md:text-xl family2 text-dark">
                Set up your calendar{" "}
                <span className="block text-sm md:text-base regular text-grey">
                  Choose which dates your listing is available. It will be
                  visible 20 hours after you publish.
                </span>
              </div>
              <div className="list1 text-lg md:text-xl family2 text-dark">
                Adjust your settings
                <span className="block text-sm md:text-base regular text-grey">
                  Set house rules, select a cancellation policy, choose how
                  guests book, and more.
                </span>
              </div>
            </div>
          </div>
        </div>
      </ReviewOfPlaceContainer>
      <FooterHosting
        next={`/`}
        prev={`${currentUser?.id}/price`}
        active={true}
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
