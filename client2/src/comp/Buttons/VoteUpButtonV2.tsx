import React from "react";
import styled from "styled-components/macro";
import ArrowSquare from "../../Assets/svg/ArrowSquare";
import ThumbUpForButton from "../../Assets/svg/ThumbUpForButton";

export default function VoteUpButtonV2() {
  return (
    <div>
      <StyledWrapper>
        <ArrowSquare />

        <ThumbUpForButton />
      </StyledWrapper>
    </div>
  );
}

const StyledWrapper = styled.button`
  position: relative;
  outline: none !important;
  border: none;
  background: transparent;
  padding: 0;

  &:active svg:first-of-type path {
    fill: var(--highlight);
  }

  & svg:last-of-type {
    position: absolute;
    fill: var(--positive);
    left: 50%;
    margin-left: -13.5px;
    top: 50%;
    margin-top: -14px;
  }

  &:active svg:last-of-type path {
    fill: black;
  }
`;
