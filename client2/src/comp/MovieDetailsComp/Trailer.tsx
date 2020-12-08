import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

export default function Trailer({ trailerUrl }: { trailerUrl: string }) {
  return (
    <TrailerWrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{
        duration: 1,
      }}
    >
      {/* {getTrailerUrl() === undefined ? (
        // <div className="loader loader_center" />
        <img
          className={style.backdrop}
          src={baseUrl + movieDetails?.backdrop_path}
          alt="movie backdrop"
        />
      ) : ( */}
      <iframe allowFullScreen={true} src={trailerUrl} title="trailer_vid" />
      {/* )} */}
    </TrailerWrapper>
  );
}

const TrailerWrapper = styled(motion.div)`
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
