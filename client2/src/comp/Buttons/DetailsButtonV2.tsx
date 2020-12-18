import React from "react";
import styled from "styled-components";
import DetailsIcon from "../../Assets/svg/DetailsIcon";
import TrailerIcon from "../../Assets/svg/TrailerIcon";

interface IProps {
  isDetails?: boolean;
}

export default function DetailsButtonV2({ isDetails = true }: IProps) {
  const details = (
    <>
      <DetailsIcon />
      <span>Details</span>
    </>
  );

  const trailer = (
    <>
      <TrailerIcon />
      <span>Trailer</span>
    </>
  );

  return <StyledButton>{isDetails ? details : trailer}</StyledButton>;
}

const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 69px;
  height: 48px;

  border: 2px solid #000000;
  box-sizing: border-box;
  border-radius: 4px;

  outline: none !important;
  background: transparent;

  & svg {
    margin-left: 2px;
    margin-top: 2px;
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
