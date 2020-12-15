import React from "react";
import styled from "styled-components/macro";
import genreMaker from "../../Helper/genreMaker";

interface IProps {
  genreIds?: number[];
  year?: string;
  runTime: number;
  certs: string;
}

export default function GenreRunTimeYear({
  genreIds,
  year,
  runTime,
  certs,
}: IProps) {
  return (
    <Wrapper>
      {/* <h3>{getGenres(movie)}</h3> */}
      {genreIds && <h3>{genreMaker(genreIds)}</h3>}
      <h3>{`${certs} | ${runTime} | ${year}`}</h3>
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
