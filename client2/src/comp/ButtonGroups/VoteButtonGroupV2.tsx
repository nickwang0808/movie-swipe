import React from "react";
import styled from "styled-components";
import { Btn } from "../../theme/BaseComp";
import DetailsButtonV2 from "../Buttons/DetailsButtonV2";
import VoteDownButtonV2 from "../Buttons/VoteDownButtonV2";
import VoteUpButtonV2 from "../Buttons/VoteUpButtonV2";

interface IProps {
  handleDislike: () => void;
  handleLike: () => void;
  forceActiveLikeButton?: boolean;
  forceActiveDislikeButton?: boolean;
  handleDetails: () => void;
  handleTrailer: () => void;
  disableDetails?: boolean;
  disableTrailer?: boolean;
  showBackButton?: boolean;
  handleBack?: () => void;
}

export default function VoteButtonGroupV2({
  handleDislike,
  handleLike,
  forceActiveDislikeButton = false,
  forceActiveLikeButton = false,
  handleDetails,
  handleTrailer,
  disableDetails = false,
  disableTrailer = false,
  showBackButton = false,
  handleBack = () => {},
}: IProps) {
  return (
    <StyledContainer>
      <VoteDownButtonV2
        onClick={handleDislike}
        forceActive={forceActiveDislikeButton}
      />
      {showBackButton ? (
        <Btn onClick={handleBack}>Back</Btn>
      ) : (
        <>
          <DetailsButtonV2 onClick={handleDetails} disabled={disableDetails} />
          <DetailsButtonV2
            onClick={handleTrailer}
            isDetails={false}
            disabled={disableTrailer}
          />
        </>
      )}
      <VoteUpButtonV2
        onClick={handleLike}
        forceActive={forceActiveLikeButton}
      />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 48px;
  margin: 0 1rem;
`;
