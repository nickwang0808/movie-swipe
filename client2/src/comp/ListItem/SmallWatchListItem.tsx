import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import baseUrl from "../../Helper/TmdbBaseUrl";
import {
  IVotedMovies,
  IVotedMTvs,
  IWatchedMovies,
  IWatchedTvs,
} from "../../MovieTypes";
import { setModalToShow } from "../../redux/DetailsScreenState/DetailsScreenReducer";

interface IProps {
  movie: IVotedMovies | IVotedMTvs | IWatchedMovies | IWatchedTvs;
}

export default function SmallWatchListItem({ movie }: IProps) {
  const dispatch = useDispatch();
  return (
    <Wrapper onClick={() => dispatch(setModalToShow(movie.id))}>
      <PosterThumbnail src={baseUrl + movie.poster_path} />
      <StyledTitleContainer>
        <h2>{"release_date" in movie ? movie.title : movie.name}</h2>
      </StyledTitleContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 2em;
  border-bottom: var(--border-bottom);
  position: relative;
`;

const StyledTitleContainer = styled.div`
  padding: 0 0 0.75em 0;
  font-weight: 600;
`;

const PosterThumbnail = styled.img`
  height: 48px;
  width: 31.53px;
  margin: 0 2em 0 0;
`;
