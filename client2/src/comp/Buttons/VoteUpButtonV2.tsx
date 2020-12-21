import React from "react";
import styled from "styled-components/macro";
import ArrowSquare from "../../Assets/svg/ArrowSquare";
import ThumbUpForButton from "../../Assets/svg/ThumbUpForButton";

interface IProps {
  onClick: () => void;
}

export default function VoteUpButtonV2({ onClick }: IProps) {
  return (
    <div>
      <StyledWrapper onClick={onClick}>
        <ThumbUpForButton />
      </StyledWrapper>
    </div>
  );
}

const StyledWrapper = styled.button`
  position: relative;
  outline: none !important;
  background: none;

  width: 48px;
  height: 46px;
  margin-left: 0.5rem;

  & svg:last-of-type {
    fill: var(--dark);
  }

  &:active svg:last-of-type path {
    fill: var(--positive);
  }
`;
