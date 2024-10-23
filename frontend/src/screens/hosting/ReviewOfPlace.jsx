import styled from "styled-components";
import React from "react";
import ReviewofPlaceComponent from "../../components/create_listings/reviews";

export default function ReviewOfplace() {
  return (
    <>
      <ReviewOfplaceContainer className="flex items-center justify-center">
        <ReviewofPlaceComponent />
      </ReviewOfplaceContainer>
    </>
  );
}

const ReviewOfplaceContainer = styled.div`
  width: 100%;
  overflow: hidden;
  padding-top: 4rem;
`;
