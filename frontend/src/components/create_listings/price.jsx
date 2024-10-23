import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import FooterHosting from "./footer";
import {
  clearGigsAlert,
  handleListingPrice,
} from "@/features/room/roomSlice";
import Message from "../loaders/Message";
import LoaderIndex from "../loaders";
export default function PriceofPlace() {
  const { currentUser } = useSelector((store) => store.auth);
  const { listing, creatingRoomisSuccess, gigsIsLoading } = useSelector(
    (store) => store.room
  );
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();

  const handleListingPrices = (e) => {
    setPrice(e.target.value);
    dispatch(handleListingPrice(e.target.value));
  };

  useEffect(() => {
    setPrice(50);
    dispatch(handleListingPrice(price));
  }, [setPrice]);

  return (
    <>
      <PriceofPlaceContainer>
        <Message
          alertText={"Your Listing has been succesfully created"}
          showAlert={creatingRoomisSuccess}
          // handleClearAlert={}
        />
        {gigsIsLoading && <LoaderIndex />}
        <div className="hidden-w-full">
          <div
            data-aos="fade-up"
            data-aos-duration="1400"
            className="aboutCenter flex flex-col gap-1 justify-center items-center w-[90%]  max-w-custom mx-auto"
          >
            <h2 className="family2 w-full text-start text-dark">
              Now, set your price
              <span className="block py-1 text-sm regular text-grey">
                You can change it anytime.
              </span>
            </h2>
            <div className="grid w-[90%]  max-w-custom mx-auto">
              <div
                placeholder="fun boat"
                className="uploadWrapper auto flex items-center justify-center flex flex-col gap-1"
              >
                <input
                  value={price}
                  name="price"
                  placeholder="$50"
                  onChange={handleListingPrices}
                  className="fs-30 family1 text-dark text-centerfamily2"
                />
              </div>
            </div>
          </div>
        </div>
      </PriceofPlaceContainer>
      <FooterHosting
        submit={true}
        active={listing.price}
        prev={`${currentUser?.id}/duration`}
        next={`${currentUser?.id}/reviews`}
      />
    </>
  );
}

const PriceofPlaceContainer = styled.div`
  width: 100%;
  padding-bottom: 6rem;
  /* @media (max-width: 780px) {
    padding-top: 2.5rem;
  } */
  .list1 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 2rem 0;
  }
  .uploadWrapper {
    width: 70%;
    border: 1px solid rgba(0, 0, 0, 0.5);
    padding: 2rem 2rem;
    height: 10rem;
    border-radius: 8px;
    background: transparent;
    outline: none;
    font-size: 1.2rem;
    font-weight: 500;
    font-family: inherit;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    color: var(--grey-1);
    @media (max-width: 780px) {
      width: 100%;
      /* padding: 0; */
    }
    input {
      border: none;
      outline: none;
      font-size: 45px;
      font-weight: 700;
      width: 100%;
      color: #222 !important;
      &::placeholder {
        color: #222 !important;
      }
    }
  }
  .aboutCenter {
    @media (max-width: 780px) {
      flex-direction: column;
      gap: 2rem;
    }
    @media (max-width: 780px) {
      width: 90%;
      padding: 0;
    }
  }
  .image {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: cover;
  }
  h2 {
    font-size: 35px;
    line-height: 1.2;
    width: 60%;
    @media (max-width: 780px) {
      font-size: 30px;
    }
    @media (max-width: 780px) {
      width: 90%;
      padding: 0;
    }
    @media (max-width: 320px) {
      font-size: 27px;
    }
  }
`;
