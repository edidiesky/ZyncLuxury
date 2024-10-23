import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import FooterHosting from "./footer";
import {
  clearGigsAlert,
  handleListingPrice,
} from "../../Features/listing/listingSlice";
import Message from "../loaders/Message";
import LoaderIndex from "../loaders";
export default function PriceofPlace() {
  const { userInfo } = useSelector((store) => store.user);
  const { host_listing, gigsIsSuccess, gigsIsLoading } = useSelector(
    (store) => store.gigs
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
          showAlert={gigsIsSuccess}
          // handleClearAlert={}
        />
        {gigsIsLoading && <LoaderIndex />}
        <div className="hidden-w-100">
          <div
            data-aos="fade-up"
            data-aos-duration="1400"
            className="aboutCenter flex column gap-1 justify-center item-center w-85 auto"
          >
            <h2 className="text-extra-bold w-100 text-start text-dark">
              Now, set your price
              <span className="block py-1 fs-18 text-light text-grey">
                You can change it anytime.
              </span>
            </h2>
            <div className="grid w-85 auto">
              <div
                placeholder="fun boat"
                className="uploadWrapper auto flex item-center justify-center flex column gap-1"
              >
                <input
                  value={price}
                  name="price"
                  placeholder="$50"
                  onChange={handleListingPrices}
                  className="fs-30 family1 text-dark text-center text-extra-bold"
                />
              </div>
            </div>
          </div>
        </div>
      </PriceofPlaceContainer>
      <FooterHosting
        submit={true}
        active={host_listing.listing_price}
        prev={`${userInfo?._id}/duration`}
        next={`${userInfo?._id}/reviews`}
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
