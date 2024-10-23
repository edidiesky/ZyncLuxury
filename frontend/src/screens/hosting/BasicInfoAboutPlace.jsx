import styled from "styled-components";
import React from "react";
// import BasicInfoAboutPlace from "../components/listing/basics";

export default function BasicInfoAboutPlace() {
  return (
    <>
      <BasicInfoAboutPlaceContainer className="flex item-center justify-center">
        {/* <BasicInfoAboutPlace /> */}
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
