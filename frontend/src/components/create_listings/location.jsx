import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdLocationOn } from "react-icons/md";
import FooterHosting from "./footer";
import SelectInput from "../forms/Select";
import Map from "../forms/map";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleListingLocation } from "../../Features/listing/listingSlice";
export default function Location() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((store) => store.user);
  const { host_listing } = useSelector((store) => store.gigs);

  const [country, setCountry] = useState("");
  const onChange = (country) => {
    setCountry(country);
    dispatch(
      handleListingLocation({
        location: country.label,
        region: country.region,
      })
    );
  };

  useEffect(() => {
    if (host_listing.listing_region && host_listing?.listing_location) {
      setCountry({
        label: host_listing?.listing_location,
        region: host_listing?.listing_region,
      });
    }
  }, [host_listing]);

  // console.log(country);
  const active = host_listing.listing_region && host_listing?.listing_location
  // console.log(active)
  return (
    <>
      <LocationofPlaceContainer>
        <div
          data-aos="fade-up"
          data-aos-duration="1400"
          className="aboutCenter flex column gap-2 justify-center item-center w-85 auto"
        >
          <h2 className="text-bold w-100 text-start text-dark">
            Where's your place located?
            <span className="fs-20 block py-1 text-light text-grey">
              Your address is only shared with guests after they’ve made a
              reservation.
            </span>
          </h2>
          <form
            action=""
            className="locationsearch text-dark flex item-center gap-2"
          >
            <div className="searchwrapper auto">
              <SelectInput value={country} onChange={onChange} />
              {/* <Map /> */}
            </div>
          </form>
        </div>
      </LocationofPlaceContainer>
      <FooterHosting
        active={active}
        next={`${userInfo?._id}/floor-plan`}
        prev={`${userInfo?._id}/structure`}
      />
    </>
  );
}

const LocationofPlaceContainer = styled.div`
  width: 100%;
  /* overflow: hidden; */
  /* padding-bottom: 6rem; */
  h2 {
    font-size: 35px;
    line-height: 1.2;
    width: 60%;

    @media (max-width: 780px) {
      font-size: 30px;
    }
    @media (max-width: 780px) {
      width: 90%;
    }
  }
  .locationsearch {
    width: 100%;
    position: relative;

    .searchwrapper {
      width: 60%;
      position: relative;
      height: 60vh;
      @media (max-width: 780px) {
        width: 90%;
      }
      .icon {
        position: absolute;
        left: 5%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .map {
      /* position: absolute;
      width: 100%;
      height: 100%;
      top: 0; */
      /* z-index: 30000; */
      height: 60vh;
    }
    select {
      width: 100%;
      border: none;
      outline: none;
      padding: 1.5rem 6rem;
      margin: 0 auto;
      border-radius: 40px;
      border: 2px solid rgba(0, 0, 0, 0.06);

      box-shadow: 0 7px 20px rgba(0, 0, 0, 0.1);
      &:hover {
        border: 2px solid rgba(0, 0, 0, 1);
      }
      @media (max-width: 780px) {
        /* width: 90%; */
        padding: 1rem 4rem;
      }
    }
  }
`;
