import React from "react";
import styled from "styled-components/macro";
import parseCerts from "../../Helper/parseCerts";
import baseUrl from "../../Helper/TmdbBaseUrl";
import { IExtendedMovieDetails } from "../../MovieTypes/ExtendedMovieDetails";
import GenreRunTimeYear from "../Misc/GenreRunTimeYear";
import Ratings from "../Misc/Ratings";

interface IProps {
  movieInfo: IExtendedMovieDetails;
  onClick: () => void;
}

export default function TitleBox({ movieInfo, onClick }: IProps) {
  return (
    <Wrapper
      // animate={{ opacity: 1, paddingTop: "0rem" }}
      // initial={{ opacity: 0, paddingTop: "2rem" }}
      // transition={{
      //   duration: 0.5,
      //   ease: [0.16, 1, 0.3, 1],
      // }}
      onClick={onClick}
    >
      <StyledPoster url={movieInfo.poster_path} />

      <TitleWrapper>
        <h1>{movieInfo.title}</h1>
      </TitleWrapper>

      <Ratings rating={movieInfo.vote_average} />

      <GenreRunTimeYear
        certs={parseCerts(movieInfo.release_dates)}
        runTime={movieInfo.runtime}
        genreIds={movieInfo.genres.map((elem) => elem.id)}
        year={String(movieInfo.release_date).slice(0, 4)}
      />
    </Wrapper>
  );
}

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
