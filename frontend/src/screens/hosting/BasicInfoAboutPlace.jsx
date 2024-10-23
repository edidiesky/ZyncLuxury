import styled from "styled-components";
import React from "react";
import BasicInfoAboutPlaceComponent from "../../components/create_listings/basics";

export default function BasicInfoAboutPlace() {
  return (
    <>
      <BasicInfoAboutPlaceContainer className="flex items-center justify-center">
        <BasicInfoAboutPlaceComponent />
      </BasicInfoAboutPlaceContainer>
    </>
  );
}

const BasicInfoAboutPlaceContainer = styled.div`
  width: 100%;
  /* overflow: hidden; */
  /* min-height: 70vh; */
  padding-top: 4rem;
`;
