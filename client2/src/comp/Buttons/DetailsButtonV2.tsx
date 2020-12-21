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

  width: 48px;
  height: 48px;
  margin: 0 0.5em;

  outline: none !important;
  background: transparent;

  &:active * {
    fill: var(--highlight);
    color: var(--highlight);
  }

`;
