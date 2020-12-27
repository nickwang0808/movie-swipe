import React from "react";
import styled, { css } from "styled-components/macro";
import ArrowSquare from "../../Assets/svg/ArrowSquare";
import ThumbUpForButton from "../../Assets/svg/ThumbUpForButton";

interface IProps {
  onClick: () => void;
  forceActive?: boolean;
}

export default function VoteUpButtonV2({
  onClick,
  forceActive = false,
}: IProps) {
  return (
    <div>
      <StyledWrapper forceActive={forceActive} onClick={onClick}>
        <ArrowSquare />
        <ThumbUpForButton />
      </StyledWrapper>
    </div>
  );
}

const StyledWrapper = styled.button<{ forceActive: boolean }>`
  position: relative;
  outline: none !important;
  /* background: none; */

  background: transparent;
  padding: 0;
  margin-top: 4px; /* button is off horizontal center for some reason */
  margin-left: 0.5rem;

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

  & svg:last-of-type path {
    ${(props) =>
      props.forceActive &&
      css`
        fill: black;
      `}
  }
  & svg:first-of-type path {
    ${(props) =>
      props.forceActive &&
      css`
        fill: var(--highlight);
      `}
  }
`;
