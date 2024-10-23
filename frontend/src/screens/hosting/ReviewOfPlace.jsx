import styled from "styled-components";
import React from "react";
import ReviewofPlace from "../components/listing/reviews";

export default function ReviewOfplace() {
  return (
    <>
      <ReviewOfplaceContainer className="flex item-center justify-center">
        <ReviewofPlace />
      </ReviewOfplaceContainer>
    </>
  );
}

const ReviewOfplaceContainer = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 100vh;
  padding-top: 4rem;
`;
