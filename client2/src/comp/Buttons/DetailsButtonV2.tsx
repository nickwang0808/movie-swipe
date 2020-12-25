import React from "react";
import styled from "styled-components";
import DetailsIcon from "../../Assets/svg/DetailsIcon";
import TrailerIcon from "../../Assets/svg/TrailerIcon";

interface IProps {
  isDetails?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function DetailsButtonV2({
  isDetails = true,
  onClick,
  disabled = false,
}: IProps) {
  const details = (
    <>
      <DetailsIcon />
      {/* <span>Details</span> */}
    </>
  );

  const trailer = (
    <>
      <TrailerIcon />
      {/* <span>Trailer</span> */}
    </>
  );

  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {isDetails ? details : trailer}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  height: 44px;
  margin: 0 0.5rem;

  border: 2px solid #000000;
  box-sizing: border-box;
  border-radius: 4px;

  outline: none !important;
  background: transparent;

  &:active {
    border-color: var(--highlight);
  }

  &:active * {
    fill: var(--highlight);
    color: var(--highlight);
  }

  & > span {
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.5px;
  }
`;
