import React from "react";
import styled from "styled-components/macro";
import ArrowSquare from "../../Assets/svg/ArrowSquare";
import ThumbDownForButton from "../../Assets/svg/ThumbDownForButton";

interface IProps {
  onClick: () => void;
}

export default function VoteDownButtonV2({ onClick }: IProps) {
  return (
    <div>
      <StyledWrapper onClick={onClick}>
        <ThumbDownForButton />
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
  margin-right: 0.5rem;

  & svg:last-of-type {
    fill: var(--dark);
  }

  &:active svg:last-of-type path {
    fill: var(--negative);
  }
`;
