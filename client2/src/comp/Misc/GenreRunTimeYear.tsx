import React from "react";
import styled from "styled-components";

export default function GenreRunTimeYear() {
  return (
    <Wrapper>
      {/* <h3>{getGenres(movie)}</h3> */}
      <h3>Animation, Action, Adventure, Fantasy, Drama</h3>
      <h3>{"PG | 120min |2020"}</h3>
      {/* <h3>{`${getMovieCertificate(movie)} | ${
        movie.runtime
      }min | ${movie.release_date.toString().slice(0, 4)}`}</h3> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  opacity: 0.7;
  letter-spacing: 0.5px;
`;
