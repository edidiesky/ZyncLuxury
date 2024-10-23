import styled from "styled-components";
import React from "react";
import Location from "../components/listing/location";

export default function LocationOfplace() {
  return (
    <>
      <LocationOfplaceContainer className="flex item-center justify-center">
        <Location />
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
