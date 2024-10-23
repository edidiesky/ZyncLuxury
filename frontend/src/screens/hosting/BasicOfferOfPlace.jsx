import styled from "styled-components";
import React from "react";
// import OfferofPlace from "../../components/create_listings/offer";

export default function BasicOfferOfPlace() {
  return (
    <>
      <BasicOfferOfPlaceContainer className="flex items-center justify-center">
        {/* <OfferofPlace/> */}
      </BasicOfferOfPlaceContainer>
    </>
  );
}

const BasicOfferOfPlaceContainer = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
  padding-top: 4rem;
`;
