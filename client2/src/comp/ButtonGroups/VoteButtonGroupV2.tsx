import React from "react";
import styled from "styled-components";
import DetailsButtonV2 from "../Buttons/DetailsButtonV2";
import VoteDownButtonV2 from "../Buttons/VoteDownButtonV2";
import VoteUpButtonV2 from "../Buttons/VoteUpButtonV2";

export default function VoteButtonGroupV2() {
  return (
    <StyledContainer>
      <VoteDownButtonV2 />
      <DetailsButtonV2 />
      <DetailsButtonV2 isDetails={false} />
      <VoteUpButtonV2 />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-space-around;
  align-items: center;
  height: 48px;
`;
