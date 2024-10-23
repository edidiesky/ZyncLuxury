import styled from "styled-components";
import React from "react";
import DescriptionofPlaceComponent from "../../components/create_listings/description";

export default function DescriptionOfplace() {
  return (
    <>
      <DescriptionOfplaceContainer className="flex items-center justify-center">
        <DescriptionofPlaceComponent />
      </DescriptionOfplaceContainer>
    </>
  );
}

const DescriptionOfplaceContainer = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
  padding-top: 4rem;
`;
