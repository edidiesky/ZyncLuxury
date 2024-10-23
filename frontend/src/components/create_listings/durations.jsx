import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import moment from "moment";
import { useDispatch } from "react-redux";
import FooterHosting from "./footer";
import {
  handleListingDate,
  handleListingPrice,
} from "../../Features/listing/listingSlice";
import DateInput from "../forms/Date";
export default function DurationofPlace() {
  const { userInfo } = useSelector((store) => store.user);
  const { host_listing } = useSelector((store) => store.gigs);
  const [date, setDate] = useState("");
  const [dateRange, setDateRange] = useState({
    selection: {
      startDate: Date.now(),
      endDate: Date.now(),
      key: "selection",
    },
  });
  const dispatch = useDispatch();

  const handleSelect = (ranges) => {
    // console.log(ranges);
    const selectedStartDate = ranges?.range1
      ? ranges?.range1.startDate
      : ranges.selection.startDate;
    const selectedendDate = ranges?.range1
      ? ranges?.range1.endDate
      : ranges.selection.endDate;

    setDateRange({
      ...ranges.selection,
      selection: {
        startDate: selectedStartDate,
        endDate: selectedendDate,
      },
    });

    dispatch(
      handleListingDate({
        startDate: moment(selectedStartDate).format("DD/MM/YYYY"),
        endDate: moment(selectedendDate).format("DD/MM/YYYY"),
      })
    );
  };

  // useEffect(() => {
  //   if (host_listing.listing_startDate && host_listing.listing_endDate) {
  //     setDateRange({
  //       selection: {
  //         startDate: host_listing.listing_startDate,
  //         endDate: host_listing.listing_endDate,
  //       },
  //     });
  //   }
  // }, [
  //   host_listing.listing_endDate,
  //   host_listing.listing_startDate,
  //   setDateRange,
  // ]);

  // console.log(host_listing.listing_startDate)

  return (
    <>
      <DurationofPlaceContainer>
        <div className="hidden-w-100">
          <div
            data-aos="fade-up"
            data-aos-duration="1400"
            className="aboutCenter flex column justify-center item-center w-85 auto"
          >
            <h2 className="text-extra-bold w-100 text-start text-dark">
              Now, set your date
              <span className="block py-1 fs-18 text-light text-grey">
                You can change it anytime.
              </span>
            </h2>
            <div className="grid w-90 auto">
              <div className="uploadWrapper auto flex column gap-2">
                <DateInput handleSelect={handleSelect} dateRange={dateRange} />
              </div>
            </div>
          </div>
        </div>
      </DurationofPlaceContainer>
      <FooterHosting
        active={host_listing.listing_startDate}
        prev={`${userInfo?._id}/description`}
        next={`${userInfo?._id}/price`}
      />
    </>
  );
}

const DurationofPlaceContainer = styled.div`
  width: 100%;
  padding-bottom: 12rem;
  /* @media (max-width: 780px) {
    padding-top: 2.5rem;
  } */
  .list1 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 2rem 0;
  }
  .uploadWrapper {
    width: 70%;
    padding: 2rem 2rem;
    height: 10rem;
    border-radius: 8px;
    background: transparent;
    outline: none;
    font-size: 1.2rem;
    font-weight: 500;
    font-family: inherit;
    /* border: 1px solid rgba(0, 0, 0, 0.1); */

    border-radius: 20px;
    color: var(--grey-1);
    @media (max-width: 780px) {
      width: 100%;

      padding: 0;
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
