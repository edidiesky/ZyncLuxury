import styled from "styled-components";
import React from "react";
// import Location from "../../components/create_listings/location";

export default function LocationOfplace() {
  return (
    <>
      <LocationOfplaceContainer className="flex items-center justify-center">
        {/* <Location /> */}
      </LocationOfplaceContainer>
    </>
  );
}

const LocationOfplaceContainer = styled.div`
  width: 100%;
  /* overflow: hidden; */
  /* min-height: 70vh; */
  padding-top: 4rem;
`;
