import styled from "styled-components";
import React from "react";
// import InformationofPlace from "../../components/create_listings/information";

export default function InformationOfplace() {
  return (
    <>
      <InformationOfplaceContainer className="flex items-center justify-center">
        {/* <InformationofPlace /> */}
      </InformationOfplaceContainer>
    </>
  );
}

const InformationOfplaceContainer = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
  /* padding-top: 4rem; */
`;
