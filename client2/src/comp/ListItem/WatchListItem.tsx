import React from "react";
import styled, { css } from "styled-components/macro";
import parseCerts from "../../Helper/parseCerts";
import baseUrl from "../../Helper/TmdbBaseUrl";
import { IVotedMovies } from "../../MovieTypes";
import { IMovieDetailsForDetailsExtended } from "../../MovieTypes/IDetialsScreen";
import { IProfileDetails } from "../../redux/Profile/profileReducer";
import GenreRunTimeYear from "../Misc/GenreRunTimeYear";
import MatchTag from "../Misc/MatchTag";
import Ratings from "../Misc/Ratings";
import WatchedTag from "../Misc/WatchedTag";

interface ILikedMovieInMyList {
  movie: IVotedMovies | IMovieDetailsForDetailsExtended;
  matched?: IProfileDetails[];
  watched?: IProfileDetails[];
  notify: boolean;
  onClick: () => void;
}

export default function WatchListItem({
  movie,
  matched,
  watched,
  notify,
  onClick,
}: ILikedMovieInMyList) {
  return (
    <>
      <Wrapper onClick={onClick}>
        <PosterThumbnail
          notify={notify}
          src={`${baseUrl}${movie.poster_path}`}
          alt="Post Image"
        />
        <div style={{ width: "100%" }}>
          {matched && matched?.length > 0 && <MatchTag />}

          <StyledTitleContainer>
            <h2>{movie.title}</h2>
          </StyledTitleContainer>

          {watched && (
            <WatchedTag
              name={watched.map(
                (elem) => elem.displayName || elem.email || elem.uid
              )}
            />
          )}

          <Ratings rating={movie.vote_average} />

          <GenreRunTimeYear
            certs={parseCerts(movie.release_dates)}
            runTime={movie.runtime}
            genreIds={movie.genres.map((elem) => elem.id)}
            year={String(movie.release_date).slice(0, 4)}
          />
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 2em;
  border-bottom: var(--border-bottom);
  position: relative;
`;

const PosterThumbnail = styled.img<{ notify: boolean }>`
  height: 110px;
  width: 73px;
  margin: 0 2em 0 0;
  ${(props) =>
    props.notify &&
    css`
      border: 2px solid red;
    `}
`;

const StyledTitleContainer = styled.div`
  padding: 0 0 0.75em 0;
  font-weight: 600;
`;
