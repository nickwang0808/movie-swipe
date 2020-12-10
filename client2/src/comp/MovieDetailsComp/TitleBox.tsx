import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components/macro";
import baseUrl from "../../Helper/TmdbBaseUrl";
import GenreRunTimeYear from "../Misc/GenreRunTimeYear";
import Ratings from "../Misc/Ratings";

export default function TitleBox({ poster_path }: { poster_path: string }) {
  return (
    <Wrapper
      animate={{ opacity: 1, paddingTop: "0rem" }}
      initial={{ opacity: 0, paddingTop: "2rem" }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <StyledPoster url={poster_path} />

      <TitleWrapper>
        <h1>Movie Title</h1>
      </TitleWrapper>

      <Ratings rating={7.2} />

      <GenreRunTimeYear />
    </Wrapper>
  );
}

const StyledPoster = styled.div<{ url: string }>`
  width: var(--poster_width);
  height: var(--poster_height);
  /* width: 113px;
  height: 170px; */
  background-size: cover;
  background-position: center;
  position: absolute;
  left: 2rem;
  top: -4em;
  right: 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3), 0px 10px 20px rgba(0, 0, 0, 0.3);
  z-index: 5;

  background-image: linear-gradient(
      25deg,
      rgba(255, 255, 255, 0) 52%,
      rgba(255, 255, 255, 0.2) 53%,
      rgba(255, 255, 255, 0.2) 100%
    ),
    url(${(props) => baseUrl + props.url});
`;

const TitleWrapper = styled.div`
  padding: 1em 0;
  font-weight: 600;

  & h1 {
    padding-left: 0;
    padding: 1rem 0;
    color: var(--dark);
    box-shadow: none;
    background: rgba(0, 0, 0, 0);
  }
`;

const Wrapper = styled(motion.div)`
  padding: 0 2rem;
  position: relative;
  padding-left: calc(var(--poster_width) + 4rem);
  padding-bottom: 3rem;
  min-height: calc(var(--poster_height) - 4rem);
  background-color: rgba(0, 0, 0, 0);
`;
