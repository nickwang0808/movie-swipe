import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import baseUrl from "../../Helper/TmdbBaseUrl";
import { Result } from "../../MovieTypes/IPopularMovies";
import { IProfileDetails } from "../../redux/Profile/profileReducer";
import GenreRunTimeYear from "../Misc/GenreRunTimeYear";
import MatchTag from "../Misc/MatchTag";
import Ratings from "../Misc/Ratings";
import WatchedTag from "../Misc/WatchedTag";

interface ILikedMovieInMyList {
  movie: Result;
  matched?: IProfileDetails[];
  watched?: boolean;
  notify: boolean;
}

export default function WatchListItem({
  movie,
  matched,
  watched = false,
  notify,
}: ILikedMovieInMyList) {
  return (
    <>
      <StyledWrapperLink to={`/detials/${movie.id}`}>
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

          {watched && <WatchedTag name="Nick Wang" />}

          <Ratings rating={5} />

          <GenreRunTimeYear
            genreIds={movie.genre_ids}
            year={String(movie.release_date).slice(0, 4)}
          />
        </div>
      </StyledWrapperLink>
    </>
  );
}

const StyledWrapperLink = styled(Link)`
  display: flex;
  padding: 2em;
  border-bottom: var(--border-bottom);
  position: relative;
  color: #111111;
  text-decoration: none;
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
