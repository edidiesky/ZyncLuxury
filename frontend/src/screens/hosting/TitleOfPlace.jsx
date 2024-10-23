import styled from "styled-components";
import React from "react";
// import TitleofPlace from "../components/listing/title";

export default function TitleOfplace() {
  return (
    <>
      <TitleOfplaceContainer className="flex items-center justify-center">
        {/* <TitleofPlace /> */}
      </TitleOfplaceContainer>
    </>
  );
}

const TitleOfplaceContainer = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
  /* padding-top: 4rem; */
`;
