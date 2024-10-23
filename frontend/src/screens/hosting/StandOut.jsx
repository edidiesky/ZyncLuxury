import styled from "styled-components";
import React from "react";
// import StandOut from "../components/create_listings/stand-out";

export default function StandOut() {
  return (
    <>
      <ExceptionContainer className="flex item-center justify-center">
        {/* <StandOut /> */}
      </ExceptionContainer>
    </>
  );
}

const ExceptionContainer = styled.div`
  width: 100%;
  padding-top: 7rem;
`;
