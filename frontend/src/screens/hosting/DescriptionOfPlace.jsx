import styled from "styled-components";
import React from "react";
import DescriptionofPlace from "../components/listing/description";

export default function DescriptionOfplace() {
  return (
    <>
      <DescriptionOfplaceContainer className="flex item-center justify-center">
        <DescriptionofPlace />
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
