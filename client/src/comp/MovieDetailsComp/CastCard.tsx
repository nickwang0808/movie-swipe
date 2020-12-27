import React from "react";
import styled from "styled-components";
import { baseUrlLogo } from "../../Helper/TmdbBaseUrl";
import { Cast } from "../../MovieTypes/ExtendedMovieDetails";

interface IProps {
  cast: Cast | null;
}

export default function CastCard({ cast }: IProps) {
  if (!cast) return null;
  return (
    <StyledDiv>
      <StyleImg src={baseUrlLogo + cast.profile_path} />
      <StyledCardText>{cast.name}</StyledCardText>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  flex-shrink: 0; /* don't remove this */
  flex-direction: column;
  width: 88px;

  margin-right: 9px;
`;

const StyleImg = styled.img`
  border-radius: 3px;
`;

const StyledCardText = styled.div`
  margin-top: 8px;
  font-size: 14px;
  line-height: 125%;
`;
