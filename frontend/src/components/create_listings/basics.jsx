import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FooterHosting from "./footer";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleBasicListing } from "@/features/room/roomSlice";
export default function BasicInfoAboutPlace() {
  const { currentUser } = useSelector((store) => store.auth);
  const { listing } = useSelector((store) => store.room);

  const dispatch = useDispatch();
  const [guests, setGuests] = useState(2);
  const [bedroom, setBedRoom] = useState(2);
  const [bathroom, setBathroom] = useState(1);

  useEffect(() => {
    dispatch(
      handleBasicListing({ bathroom: bathroom, bedroom: bedroom, guests: guests })
    );
  }, [guests, bedroom, bathroom]);

  useEffect(() => {
    if (listing) {
      setGuests(listing.guests);
      setBedRoom(listing.bedroom);
      setBathroom(listing.bathroom);
    }
  }, [listing, setGuests, setBathroom, setBedRoom]);
  const active = bathroom && bedroom && guests;

  return (
    <>
      <BasicInfoAboutPlaceContainer>
        <div
        
          className="aboutCenter flex flex-col gap-8 justify-center items-center"
        >
          <h2 className="family2 w-full text-start text-dark">
            Share some basics about your place
            <span className="text-sm block py-1 regular text-grey">
              You'll add more details later, like bed types.
            </span>
          </h2>
          <div className="flex typeContainer mx-auto flex-col gap-8">
            {/* guest */}
            <div className="w-full text-sm regular pb-6 border-b typewrapper flex items-center justify-between">
              Guests
              <div className="flex items-center" style={{ gap: "1.2rem" }}>
                <button
                  onClick={() => setGuests(guests + 1)}
                  disabled={guests >= 12}
                  className="icons flex items-center justify-center"
                >
                  <BiPlus fontSize={"20px"} />
                </button>{" "}
                <h4 className="text-smfamily2">{guests}</h4>
                <button
                  onClick={() => setGuests(guests - 1)}
                  disabled={guests === 0}
                  className="icons flex items-center justify-center"
                >
                  <BiMinus fontSize={"20px"} />
                </button>
              </div>
            </div>{" "}
            {/* bedroom */}
            <div className="w-full text-sm regular pb-6 border-b typewrapper flex items-center justify-between">
              Bedrooms
              <div className="flex items-center" style={{ gap: "1.2rem" }}>
                <button
                  onClick={() => setBedRoom(bedroom + 1)}
                  disabled={bedroom >= 10}
                  className="icons flex items-center justify-center"
                >
                  <BiPlus fontSize={"20px"} />
                </button>{" "}
                <h4 className="text-smfamily2">{bedroom}</h4>
                <button
                  onClick={() => setBedRoom(bedroom - 1)}
                  disabled={bedroom === 0}
                  className="icons flex items-center justify-center"
                >
                  <BiMinus fontSize={"20px"} />
                </button>
              </div>
            </div>{" "}
            <div className="w-full text-sm regular pb-6 border-b typewrapper flex items-center justify-between">
              Bathrooms
              <div className="flex items-center" style={{ gap: "1.2rem" }}>
                <button
                  onClick={() => setBathroom(bathroom + 1)}
                  disabled={bathroom >= 12}
                  className="icons flex items-center justify-center"
                >
                  <BiPlus fontSize={"20px"} />
                </button>{" "}
                <h4 className="text-smfamily2">{bathroom}</h4>
                <button
                  onClick={() => setBathroom(bathroom - 1)}
                  disabled={bathroom === 0}
                  className="icons flex items-center justify-center"
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
        prev={`${currentUser?.id}/location`}
        next={`${currentUser?.id}/stand-out`}
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
