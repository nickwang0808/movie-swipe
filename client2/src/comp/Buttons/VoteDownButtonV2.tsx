import React from "react";
import styled, { css } from "styled-components/macro";
import ThumbDownForButton from "../../Assets/svg/ThumbDownForButton";

interface IProps {
  onClick: () => void;
  forceActive?: boolean;
}

export default function VoteDownButtonV2({
  onClick,
  forceActive = false,
}: IProps) {
  return (
    <div>
      <StyledWrapper forceActive={forceActive} onClick={onClick}>
        <ThumbDownForButton />
      </StyledWrapper>
    </div>
  );
}

const StyledWrapper = styled.button<{ forceActive: boolean }>`
  position: relative;
  outline: none !important;
  background: none;

  width: 48px;
  height: 46px;
  margin-right: 0.5rem;

  & svg:last-of-type {
    fill: var(--dark);
  }

  &:active svg:last-of-type path {
    fill: var(--negative);
  }

  & svg:last-of-type path {
    ${(props) =>
      props.forceActive &&
      css`
        fill: var(--negative);
      `}
  }
`;
