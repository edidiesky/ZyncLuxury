import styled from "styled-components";
import React from "react";
import AboutPlaceComponent from "../../components/create_listings/about";
export default function AboutPlace() {
  return (
    <>
      <AboutplaceContainer className="flex items-center justify-center">
        <AboutPlaceComponent />
      </AboutplaceContainer>
    </>
  );
}

const AboutplaceContainer = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
`;
