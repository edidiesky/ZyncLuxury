import styled from "styled-components";
import React from "react";
// import PriceofPlace from "../../components/create_listings/price";

export default function PriceOfplace() {
  return (
    <>
      <PriceOfplaceContainer className="flex items-center justify-center">
        {/* <PriceofPlace /> */}
      </PriceOfplaceContainer>
    </>
  );
}

const PriceOfplaceContainer = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
  /* padding-top: 4rem; */
`;
