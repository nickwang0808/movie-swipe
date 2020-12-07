import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import baseUrl from "../../Helper/TmdbBaseUrl";
import GenreRunTimeYear from "../Misc/GenreRunTimeYear";
import MatchTag from "../Misc/MatchTag";
import Ratings from "../Misc/Ratings";
import WatchedTag from "../Misc/WatchedTag";

interface ILikedMovieInMyList {
  movie: IMovie;
  matched?: boolean;
  watched?: boolean;
}

interface IMovie {
  poster_path: string;
  title: string;
  id: number;
}

export default function WatchListItem({
  movie,
  matched = false,
  watched = false,
}: ILikedMovieInMyList) {
  return (
    <>
      <StyledWrapperLink to={`/detials/${movie.id}`}>
        <PosterThumbnail
          src={`${baseUrl}${movie.poster_path}`}
          alt="Post Image"
        />
        <div style={{ width: "100%" }}>
          {matched && <MatchTag />}

          <StyledTitleContainer>
            <h2>{movie.title}</h2>
          </StyledTitleContainer>

          {watched && <WatchedTag name="Nick Wang" />}

          <Ratings rating={5} />

          <GenreRunTimeYear />
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

const PosterThumbnail = styled.img`
  height: 110px;
  width: 73px;
  margin: 0 2em 0 0;
`;

const StyledTitleContainer = styled.div`
  padding: 0 0 0.75em 0;
  font-weight: 600;
`;
