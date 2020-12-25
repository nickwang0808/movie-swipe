import React from "react";
import styled from "styled-components/macro";
import baseUrl from "../../Helper/TmdbBaseUrl";
import parseCerts from "../../Helper/parseCerts";
import { IExtendedMovieDetails } from "../../MovieTypes/ExtendedMovieDetails";
import { IExtendedTvDetails } from "../../MovieTypes/ExtendedTvDetails";
import Divider from "../Misc/Divider";
import RatingWIthMeta from "../Misc/RatingWIthMeta";
import GenreRunTimeYear from "../Misc/GenreRunTimeYear";
interface IProps {
  movieInfo: IExtendedMovieDetails | IExtendedTvDetails;
  dark?: boolean;
  alignToBottom?: boolean;
}


interface IProps {
  movieInfo: IExtendedMovieDetails | IExtendedTvDetails;
  onClick: () => void;
}

export default function TitleBox({ movieInfo, onClick }: IProps) {
  return (
    <Wrapper onClick={onClick}>
      <StyledPoster url={movieInfo.poster_path} />

      <TitleWrapper>
        <StyledH1>{"title" in movieInfo ? movieInfo.title : movieInfo.name}</StyledH1>
        <GenreRunTimeYear
        certs={
          "release_dates" in movieInfo
            ? parseCerts(movieInfo.release_dates)
            : undefined
        }
        runTime={"runtime" in movieInfo ? movieInfo.runtime : undefined}
        year={
          "release_date" in movieInfo
            ? String(movieInfo.release_date).slice(0, 4)
            : movieInfo.last_air_date.slice(0, 4)
        }
      />
      </TitleWrapper>

      <Divider />

      <RatingWIthMeta movieInfo={movieInfo} />
    </Wrapper>
  );
}

const StyledMetaDataWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const StyledPoster = styled.div<{ url: string }>`
  width: var(--poster_width);
  height: var(--poster_height);
  /* width: 113px;
  height: 170px; */
  background-size: cover;
  background-position: center;
  position: absolute;
  left: 2rem;
  top: -4em;
  right: 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3), 0px 10px 20px rgba(0, 0, 0, 0.3);
  z-index: 5;

  background-image: linear-gradient(
      25deg,
      rgba(255, 255, 255, 0) 52%,
      rgba(255, 255, 255, 0.2) 53%,
      rgba(255, 255, 255, 0.2) 100%
    ),
    url(${(props) => baseUrl + props.url});
`;

const StyledTagLine = styled.p`
  font-weight: normal;
  font-size: 12px;
  line-height: 125%;
`;

const StyledH1 = styled.h1`
margin-bottom: 0;
padding-bottom: 0;
`;

const TitleWrapper = styled.div`
  padding: 1em 0;
  font-weight: 600;

  & h1 {
    padding-left: 0;
    padding: 1rem 0;
    color: var(--dark);
    box-shadow: none;
    background: rgba(0, 0, 0, 0);
  }
`;

const Wrapper = styled.div`
  padding: 0 2rem;
  position: relative;
  padding-left: calc(var(--poster_width) + 4rem);
  padding-bottom: 3rem;
  min-height: calc(var(--poster_height) - 4rem);
  background-color: rgba(0, 0, 0, 0);
`;
