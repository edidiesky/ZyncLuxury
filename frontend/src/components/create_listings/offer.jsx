import React, { useState } from "react";
import styled from "styled-components";
import FooterHosting from "./footer";
import { categorydata } from "../../data/category";
import { useSelector } from "react-redux";
import Tv from "../common/svg/tv";
import Food from "../common/svg/food";
import Location from "../common/svg/Location";
import Carbon from "../common/svg/carbon";
import Room from "../common/svg/room";
import Fridge from "../common/svg/fridge";
import Kitchen from "../common/svg/kitchen";

const offerdata = [
  {
    title: "Washer",
    image: <Food />,
    id: 1,
  },
  {
    title: "Tv",
    image: <Tv />,
    id: 2,
  },
  {
    title: "Wifi",
    image: <Location />,
    id: 3,
  },
  {
    title: "Air Conditioning",
    image: <Fridge />,
    id: 4,
  },
  {
    title: "Dedicated workspace",
    image: <Room />,
    id: 5,
  },
  {
    title: "Kitchen",
    image: <Kitchen />,
    id: 6,
  },
];
export default function OfferofPlace() {
  const { currentUser } = useSelector((store) => store.auth);
  const [list, setList] = useState([]);
  const [tab, setTab] = useState(null);
  const [include, setInclusde] = useState(false);
  const handleListOffer = (index, data) => {
    setTab(index);
    // list.forEach((x) => {
    //   // if (x._id !== data.id) {
    //   //   setList([x, { text: data.title, _id: data.id }]);
    //   //   return;
    //   // }
    //   // return x;
    //   console.log(x);
    //   return;
    // });
    setList([...list, { text: data.title, _id: data.id }]);
  };

  console.log(list);

  return (
    <>
      <OfferofPlaceContainer>
        <div
        
          className="aboutCenter flex flex-col gap-3 justify-center items-center w-[90%]  max-w-custom mx-auto"
        >
          <h2 className="text-extra-bold w-full text-start text-dark">
            Tell guests what your place has to offer
            <span className="block py-1text-lg regular text-grey">
              You can add more amenities after you publish your listing.
            </span>
          </h2>
          <div className="grid cardwrapper w-[90%]  max-w-custom mx-auto">
            {offerdata.map((x, index) => {
              return (
                <div
                  onClick={() => handleListOffer(index, x)}
                  className={
                    tab === index
                      ? "card text-sm gap-1 column flex active"
                      : "card text-sm gap-1 column flex"
                  }
                >
                  {x.image}
                  <span> {x.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </OfferofPlaceContainer>
      <FooterHosting
        prev={`${currentUser?.id}/stand-out`}
        next={`${currentUser?.id}/photos`}
      />
    </>
  );
}

const OfferofPlaceContainer = styled.div`
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
    width: 50%;
    @media (max-width: 980px) {
      width: 70%;
    }
    @media (max-width: 580px) {
      width: 90%;
    }
  }
  .card {
    padding: 1.5rem 1.4rem;
    border-radius: 10px;
    /* border: 1px solid rgba(0, 0, 0, 0.2); */
    position: relative;
    min-height: 7rem;

    &:hover {
      &::after {
        opacity: 1;
        border: 2px solid rgba(0, 0, 0, 0.8);
      }
    }
    &.active {
      &::after {
        opacity: 1;
        border: 2px solid rgba(0, 0, 0, 0.8);
        background-color: #dddbdb51;
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
    width: 50%;

    @media (max-width: 980px) {
      font-size: 30px;
      width: 70%;
    }
    @media (max-width: 580px) {
      width: 90%;
    }
  }
`;
