import React from "react";
import styled from "styled-components/macro";
import genreMaker from "../../Helper/genreMaker";

interface IProps {
  genreIds?: number[];
  year?: string;
  runTime?: number;
  certs?: string;
}

export default function GenreRunTimeYear({
  genreIds,
  year,
  runTime,
  certs,
}: IProps) {
  let comp;
  if (!certs && !runTime) {
    comp = (
      <>
        <h3>{`${year}`}</h3>
        {genreIds && <h3>{genreMaker(genreIds)}</h3>}
      </>
    );
  } else {
    comp = (
      <>
        <h3>{`${certs + " •"} ${runTime + "min •"} ${year}`}</h3>
        {genreIds && <h3>{genreMaker(genreIds)}</h3>}
      </>
    );
  }

  return <Wrapper>{comp}</Wrapper>;
}

const Wrapper = styled.div`
  /* opacity: 0.7; */
  letter-spacing: 0.5px;
`;
