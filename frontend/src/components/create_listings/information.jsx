import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FooterHosting from "./footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleListingDescription } from "../../Features/listing/listingSlice";
export default function InformationofPlace() {
  const { userInfo } = useSelector((store) => store.user);
  const { host_listing } = useSelector((store) => store.gigs);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleListingDescriptions = (e) => {
    setDescription(e.target.value);
    dispatch(handleListingDescription(e.target.value));
  };

  useEffect(() => {
    if (host_listing.listing_description) {
      setDescription(host_listing.listing_description);
    }
  }, [host_listing, setDescription]);
  return (
    <>
      <InformationofPlaceContainer>
        <div className="w-100 hidden">
          <div
            data-aos="fade-up"
            data-aos-duration="1400"
            className="aboutCenter flex column gap-1 justify-center item-center w-85 auto"
          >
            <h2 className="text-extra-bold w-100 text-start text-dark">
              Create your description
              <span className="block py-1 fs-20 text-light text-grey">
                Share what makes your place special.
              </span>
            </h2>
            <div className="grid w-85 auto">
              <textarea
                value={description}
                name="description"
                onChange={handleListingDescriptions}
                placeholder="Feel refreshed when you stay in this rustic gem."
                className="uploadWrapper auto flex item-center justify-center flex column gap-1"
              />
            </div>
          </div>
        </div>
      </InformationofPlaceContainer>
      <FooterHosting
        active={description}
        prev={`${userInfo?._id}/title`}
        next={`${userInfo?._id}/duration`}
      />
    </>
  );
}

const InformationofPlaceContainer = styled.div`
  width: 100%;
  padding-bottom: 6rem;
  @media (max-width: 780px) {
    padding-top: 2.5rem;
  }
  @media (max-width: 380px) {
    padding-top: 4.5rem;
  }
  .list1 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 2rem 0;
  }
  .uploadWrapper {
    width: 70%;
    border: 1px solid rgba(0, 0, 0, 1);
    padding: 2rem 2rem;
    height: 100%;
    height: 12rem;
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

    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.4);
    }
    &:focus {
      border: 2px solid var(--dark-1);
      background: transparent;
    }
    &.true {
      background: #fff;
    }
    &.inputError {
      border: 2px solid var(--red);
    }
    &:invalid[focused="true"] ~ span {
      display: block;
    }
  }
  .aboutCenter {
    @media (max-width: 780px) {
      flex-direction: column;
      gap: 2rem;
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
      /* font-size: 40px; */
    }

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
