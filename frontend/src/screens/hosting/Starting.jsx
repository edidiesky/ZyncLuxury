import styled from "styled-components";
import React from "react";
import StartSection from "../../components/create_listings/starting";

export default function Starting() {
  return (
    <>
      <ExceptionContainer className="flex items-center justify-center">
        <StartSection />
      </ExceptionContainer>
    </>
  );
}

const ExceptionContainer = styled.div`
  width: 100%;
  padding-top: 7rem;
`;
