import React from "react";
import styled from "styled-components";
import parseCerts from "../../Helper/parseCerts";
import { IExtendedMovieDetails } from "../../MovieTypes/ExtendedMovieDetails";
import { IExtendedTvDetails } from "../../MovieTypes/ExtendedTvDetails";
import CircleDial from "./CircleDial";
import GenreRunTimeYear from "./GenreRunTimeYear";
interface IProps {
  movieInfo: IExtendedMovieDetails | IExtendedTvDetails;
  dark?: boolean;
  alignToBottom?: boolean;
}

export default function RatingWIthMeta({
  movieInfo,
  dark = true,
  alignToBottom = false,
}: IProps) {
  return (
    <StyledMetaDataWrapper alignToBottom={alignToBottom}>
      <CircleDial number={movieInfo.vote_average * 10} dark={dark} />
      <GenreRunTimeYear
        genreIds={movieInfo.genres.map((elem) => elem.id)}
      />
    </StyledMetaDataWrapper>
  );
}

const StyledMetaDataWrapper = styled.div<{ alignToBottom: boolean }>`
  display: flex;
  align-items: ${(props) => (props.alignToBottom ? "center" : "unset")};
  margin-top: 16px;
`;
