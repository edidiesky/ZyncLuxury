import styled from "styled-components";
import React from "react";
import TitleofPlaceComponent from "../../components/create_listings/title";

export default function TitleOfplace() {
  return (
    <>
      <TitleOfplaceContainer className="flex items-center justify-center">
        <TitleofPlaceComponent />
      </TitleOfplaceContainer>
    </>
  );
}

const TitleOfplaceContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;
