import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import baseUrl from "../../../Helper/TmdbBaseUrl";
import { IVotedMovies } from "../../../MovieTypes";
import MatchTag from "../../Misc/MatchTag";
import Banner from "./Banner";

interface INotificationMatched {
  closeModal: () => void;
  movie: IVotedMovies;
}

export default function MatchNotification({
  closeModal,
  movie,
}: INotificationMatched) {
  return (
    <>
      <Banner />

      <Wrapper>
        <MatchedStyling
          animate={{ visibility: "visible", width: "100%", x: 0 }}
          initial={{ visibility: "hidden", width: "0%", x: -20 }}
          transition={{
            delay: 0.5,
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
        <StyledPoster
          onClick={closeModal} // close the modal
          style={{ backgroundImage: `url(${baseUrl + movie.poster_path})` }}
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          transition={{
            delay: 0.8,
            type: "spring",
            stiffness: 200,
            damping: 15,
            velocity: 1,
          }}
        />
        <StyledDetailsWrapper
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -10 }}
          transition={{
            delay: 1,
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <MatchTag />

          <StyledMatchText>
            <p>
              <strong>
                {movie.matchedWith[0].displayName || movie.matchedWith[0].email}
              </strong>
              &nbsp;wants to watch&nbsp;<strong>{movie.title}</strong>&nbsp;too!
            </p>
          </StyledMatchText>
          <StyledDetails>
            <Link onClick={closeModal} to={`/home/details/${movie.id}`}>
              Details
            </Link>
          </StyledDetails>
        </StyledDetailsWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  margin: 0 2em;
  position: absolute;
  z-index: 1001;
  bottom: calc(var(--nav) + var(--vote) + 1rem);
  display: flex;
  flex-direction: row;
`;

const MatchedStyling = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 100%;
  border: 1px solid var(--positive);
  background-color: var(--light);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.5), 0px 7px 24px rgba(0, 0, 0, 0.25);
  z-index: 1002;
`;

const StyledPoster = styled(motion.div)`
  height: 96px;
  min-width: 63px;
  background-color: gray;
  margin: 1.5rem;
  z-index: 1003;
  background-size: contain;
  background-repeat: no-repeat;
`;

const StyledDetailsWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  z-index: 1004;
  margin: 1.5rem 1.5rem 1.5rem 0.5rem;
`;

const StyledMatchText = styled.div`
  padding-top: 1em;
  flex-grow: 1;
  overflow-wrap: anywhere;

  .matched_text p {
    line-height: 2rem;
  }
`;

const StyledDetails = styled.div`
  text-align: right;

  & a {
    text-decoration: none;
    color: var(--highlight);
    letter-spacing: 0.5px;
    font-size: 1.8rem;
    font-weight: 600;
  }
`;
