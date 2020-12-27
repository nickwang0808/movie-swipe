import React from "react";
import styled from "styled-components/macro";
import StarIcon from "../../Assets/svg/StarIcon";

export default function Ratings({ rating }: { rating: number }) {
  return (
    <StyledWrapper>
      <h3>{rating}</h3>
      <div>
        <StarIcon />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 0.75em;

  & h3 {
    font-weight: 600;
  }

  & div {
    margin: 0 0.5em;
    fill: var(--bright);
  }
`;
