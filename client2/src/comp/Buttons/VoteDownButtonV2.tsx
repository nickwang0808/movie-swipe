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
       <ArrowSquare />
       <ThumbDownForButton />
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
margin-top: 4px; /* button is off horizontal center for some reason */
margin-right: 0.5rem;


& svg:first-of-type {
  transform: rotate(180deg);
}

&:active svg:first-of-type path {
  fill: var(--highlight);
}

& svg:last-of-type {
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
