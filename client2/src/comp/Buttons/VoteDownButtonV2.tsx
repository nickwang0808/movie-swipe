import React from "react";
import styled from "styled-components/macro";
import ArrowSquare from "../../Assets/svg/ArrowSquare";
import ThumbUpForButton from "../../Assets/svg/ThumbUpForButton";

export default function VoteDownButtonV2() {
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

  & svg:first-of-type {
    transform: rotate(180deg);
  }

  &:active svg:first-of-type path {
    fill: var(--highlight);
  }

  & svg:last-of-type {
    transform: rotate(180deg);
    position: absolute;
    fill: var(--negative);
    left: 50%;
    margin-left: -11px;
    top: 50%;
    margin-top: -11px;
  }

  &:active svg:last-of-type path {
    fill: black;
  }
`;
