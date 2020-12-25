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
        certs={
          "release_dates" in movieInfo
            ? parseCerts(movieInfo.release_dates)
            : undefined
        }
        runTime={"runtime" in movieInfo ? movieInfo.runtime : undefined}
        genreIds={movieInfo.genres.map((elem) => elem.id)}
        year={
          "release_date" in movieInfo
            ? String(movieInfo.release_date).slice(0, 4)
            : movieInfo.last_air_date.slice(0, 4)
        }
      />
    </StyledMetaDataWrapper>
  );
}

const StyledMetaDataWrapper = styled.div<{ alignToBottom: boolean }>`
  display: flex;
  align-items: ${(props) => (props.alignToBottom ? "center" : "unset")};
  margin-top: 16px;
`;
