import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FooterHosting from "./footer";
import Map from "../forms/map";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleBasicListing } from "../../Features/listing/listingSlice";
export default function BasicInfoAboutPlace() {
  const { userInfo } = useSelector((store) => store.user);
  const { host_listing } = useSelector((store) => store.gigs);

  const dispatch = useDispatch();
  const [guests, setGuests] = useState(2);
  const [bedrooms, setBedRooms] = useState(2);
  const [beds, setBeds] = useState(1);

  useEffect(() => {
    dispatch(
      handleBasicListing({ beds: beds, bedrooms: bedrooms, guests: guests })
    );
  }, [guests, bedrooms, beds]);

  useEffect(() => {
    if (host_listing) {
      setGuests(host_listing.listing_guests);
      setBedRooms(host_listing.listing_bedrooms);
      setBeds(host_listing.listing_beds);
    }
  }, [host_listing, setGuests, setBeds, setBedRooms]);
  const active = beds && bedrooms && guests;

  return (
    <>
      <BasicInfoAboutPlaceContainer>
        <div
          data-aos="fade-up"
          data-aos-duration="1400"
          className="aboutCenter flex column gap-2 justify-center item-center"
        >
          <h2 className="text-bold w-100 text-start text-dark">
            Share some basics about your place
            <span className="fs-18 block py-1 text-light text-grey">
              You'll add more details later, like bed types.
            </span>
          </h2>
          <div className="flex typeContainer auto flex column gap-2">
            {/* guest */}
            <div className="w-100 fs-18 text-light bottom typewrapper flex item-center justify-space">
              Guests
              <div className="flex item-center" style={{ gap: "1.2rem" }}>
                <button
                  onClick={() => setGuests(guests + 1)}
                  disabled={guests >= 12}
                  className="icons flex item-center justify-center"
                >
                  <BiPlus fontSize={"20px"} />
                </button>{" "}
                <h4 className="fs-18 text-extra-bold">{guests}</h4>
                <button
                  onClick={() => setGuests(guests - 1)}
                  disabled={guests === 0}
                  className="icons flex item-center justify-center"
                >
                  <BiMinus fontSize={"20px"} />
                </button>
              </div>
            </div>{" "}
            {/* bedrooms */}
            <div className="w-100 fs-18 text-light bottom typewrapper flex item-center justify-space">
              Bedrooms
              <div className="flex item-center" style={{ gap: "1.2rem" }}>
                <button
                  onClick={() => setBedRooms(bedrooms + 1)}
                  disabled={bedrooms >= 10}
                  className="icons flex item-center justify-center"
                >
                  <BiPlus fontSize={"20px"} />
                </button>{" "}
                <h4 className="fs-18 text-extra-bold">{bedrooms}</h4>
                <button
                  onClick={() => setBedRooms(bedrooms - 1)}
                  disabled={bedrooms === 0}
                  className="icons flex item-center justify-center"
                >
                  <BiMinus fontSize={"20px"} />
                </button>
              </div>
            </div>{" "}
            <div className="w-100 fs-18 text-light bottom typewrapper flex item-center justify-space">
              Beds
              <div className="flex item-center" style={{ gap: "1.2rem" }}>
                <button
                  onClick={() => setBeds(beds + 1)}
                  disabled={beds >= 12}
                  className="icons flex item-center justify-center"
                >
                  <BiPlus fontSize={"20px"} />
                </button>{" "}
                <h4 className="fs-18 text-extra-bold">{beds}</h4>
                <button
                  onClick={() => setBeds(beds - 1)}
                  disabled={beds === 0}
                  className="icons flex item-center justify-center"
                >
                  <BiMinus fontSize={"20px"} />
                </button>
              </div>
            </div>{" "}
          </div>
        </div>
      </BasicInfoAboutPlaceContainer>
      <FooterHosting
        active={active}
        prev={`${userInfo?._id}/location`}
        next={`${userInfo?._id}/stand-out`}
      />
    </>
  );
}

const BasicInfoAboutPlaceContainer = styled.div`
  width: 100%;
  /* overflow: hidden; */
  /* padding-bottom: 6rem; */
  @media (max-width: 580px) {
    padding-top: 2rem;
  }
  .typeContainer {
    width: 60%;
    @media (max-width: 580px) {
      width: 90%;
    }
  }
  .bottom {
    padding-bottom: 1.2rem !important;
  }
  .aboutCenter {
    width: 80%;
    margin: 0 auto;
    padding-bottom: 6rem;
    @media (max-width: 580px) {
      width: 90%;
    }
  }
  h2 {
    font-size: 35px;
    line-height: 1.2;
    width: 60%;

    @media (max-width: 780px) {
      font-size: 30px;
    }
    @media (max-width: 580px) {
      width: 90%;
      font-size: 26px;
    }
  }
  .icons {
    width: 2.5rem;
    border-radius: 50%;
    height: 2.5rem;
    border: 1px solid rgba(0, 0, 0, 0.3);
    background-color: transparent;
    cursor: pointer;
    &:hover {
      border: 1px solid rgba(0, 0, 0, 1);
    }
    &:disabled {
      cursor: not-allowed;
    }
  }
`;
