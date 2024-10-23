import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import FooterHosting from "./footer";
import { categorydata } from "../../data/category";
import { useDispatch } from "react-redux";
import { handleListingType } from "../../Features/listing/listingSlice";
export default function DescriptionofPlace() {
  const [tab, setTab] = useState(null);
  const { host_listing, gigsIsSuccess } = useSelector((store) => store.gigs);
  const { userInfo } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleListingTypes = (x, index) => {
    setTab(index);
    dispatch(handleListingType(x.text));
  };

  

  return (
    <>
      <DescriptionofPlaceContainer>
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          className="aboutCenter flex column gap-3 justify-center item-center w-85 auto"
        >
          <h2 className=" w-85 auto text-start text-dark">
            Which of these best describes your place?
          </h2>
          <div className="grid cardwrapper w-85 auto">
            {categorydata.map((x, index) => {
              return (
                <div
                  onClick={() => handleListingTypes(x, index)}
                  className={
                    tab === index
                      ? "card fs-16 column flex active"
                      : "card fs-16 column flex"
                  }
                >
                  <img
                    src={x.image}
                    style={{ opacity: ".8" }}
                    alt=""
                    className="image"
                  />
                  {x.text}
                </div>
              );
            })}
          </div>
        </div>
      </DescriptionofPlaceContainer>
      <FooterHosting
        next={`${userInfo?._id}/location`}
        active={host_listing.listing_type}
        prev={`${userInfo?._id}/about-your-place`}
      />
    </>
  );
}

const DescriptionofPlaceContainer = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom: 6rem;
  @media (max-width: 580px) {
    padding-top: 2rem;
  }
  .list1 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 2rem 0;
  }
  .cardwrapper {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    grid-row-gap: 1rem;
    grid-column-gap: 1rem;
    width: 55%;
    @media (max-width: 580px) {
      width: 90%;
    }
  }
  .card {
    padding: 1.5rem 1.4rem;
    border-radius: 10px;
    /* border: 1px solid rgba(0, 0, 0, 0.2); */
    position: relative;

    &:hover {
      &::after {
        opacity: 1;
        border: 2px solid rgba(0, 0, 0, 0.8);
      }
    }
    &.active {
      background-color: #f7f7f7;
      &::after {
        opacity: 1;
        border: 2px solid rgba(0, 0, 0, 0.8);
      }
    }
    /* transition: all 0.5s; */
    &::after {
      border: 1px solid rgba(0, 0, 0, 0.2);
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      border-radius: inherit;
      /* opacity: 0; */
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
    width: 55%;
    padding-right: 10rem;

    @media (max-width: 1080px) {
      /* font-size: 40px; */
      width: 55%;
      padding-right: 0;
    }
    @media (max-width: 580px) {
      width: 90%;
      font-size: 30px;
    }
  }
`;
