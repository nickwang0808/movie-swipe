import React from "react";
import styled from "styled-components/macro";
import baseUrl from "../../Helper/TmdbBaseUrl";
import { IVotedMovies, IVotedMTvs } from "../../MovieTypes";
import { IProfileDetails } from "../../redux/Profile/profileReducer";
import CircleDial from "../Misc/CircleDial";
import GenreRunTimeYear from "../Misc/GenreRunTimeYear";
import MatchTag from "../Misc/MatchTag";
import WatchedTag from "../Misc/WatchedTag";

interface ILikedMovieInMyList {
  movie: IVotedMovies | IVotedMTvs;
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
          src={`${baseUrl}${movie.poster_path}`}
          alt="Post Image"
        />
        <div style={{ width: "100%" }}>
          {matched && matched?.length > 0 && <MatchTag isNew={movie.notify} />}

          <StyledTitleContainer>
            <h2>{"release_date" in movie ? movie.title : movie.name}</h2>
          </StyledTitleContainer>

          {watched && (
            <WatchedTag
              name={watched.map(
                (elem) => elem.displayName || elem.email || elem.uid
              )}
            />
          )}

          <StyledMetaDataWrapper>
            <CircleDial number={movie.vote_average * 10} />
            <GenreRunTimeYear genreIds={movie.genres.map((elem) => elem.id)} />
          </StyledMetaDataWrapper>
        </div>
      </Wrapper>
    </>
  );
}

const StyledMetaDataWrapper = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 2em;
  border-bottom: var(--border-bottom);
  position: relative;
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
