import React from "react";
import styled from "styled-components/macro";
import getTrailerUrl from "../../Helper/getTrailerUrl";
import baseUrl from "../../Helper/TmdbBaseUrl";

interface IProps {
  trailerUrl: string | undefined;
  backDrop: string;
}

export default function Trailer({ trailerUrl, backDrop }: IProps) {
  let asset;
  if (!trailerUrl || !getTrailerUrl(trailerUrl)) {
    asset = <StyledImg src={baseUrl + backDrop} alt="movie backdrop" />;
  } else {
    asset = (
      <iframe
        allowFullScreen={true}
        src={getTrailerUrl(trailerUrl)}
        title="trailer_vid"
      />
    );
  }

  return (
    <TrailerWrapper
    // animate={{ opacity: 1 }}
    // initial={{ opacity: 0 }}
    // transition={{
    //   duration: 1,
    // }}
    >
      {asset}
    </TrailerWrapper>
  );
}

const TrailerWrapper = styled.div`
  width: 100%;
  padding-top: 56.25%;
  background-size: cover;
  position: relative;

  & iframe {
    position: absolute;
    top: 0;
    width: 100%;
    height: calc(56vw);
    border: 0;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  top: 0;
`;
