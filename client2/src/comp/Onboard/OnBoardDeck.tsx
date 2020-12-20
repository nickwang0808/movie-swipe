import { motion } from "framer-motion";
import React from "react";
import styled, { css } from "styled-components/macro";
import baseUrl from "../../Helper/TmdbBaseUrl";
import AnimatedThumb from "./AnimatedThumb";
const posterUrl = [
  "/2AwPvNHphpZBJDqjZKVuMAbvS0v.jpg",
  "/4ZocdxnOO6q2UbdKye2wgofLFhB.jpg",
  "/bNo2mcvSwIvnx8K6y1euAc1TLVq.jpg",
];

export default function OnBoardDeck() {
  return (
    <Wrapper>
      <AnimatedThumb />

      <StyledMotionCard imgUrl={posterUrl[0]} key="0" />
      <StyledCard imgUrl={posterUrl[1]} key="1" />
      <StyledCard imgUrl={posterUrl[2]} key="2" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: var(--poster-width-onboarding);
  height: var(--poster-height-onboarding);
`;

const CardBase = css`
  width: var(--poster-width-onboarding);
  height: var(--poster-height-onboarding);
  left: 0px;
  position: absolute;
  top: 0px;

  background-position: center;
  background-size: cover;
`;
const StyledMotionCard = styled(motion.div).attrs({
  animate: { rotate: 10, left: 50 },
  initial: { rotate: -10, left: -50 },
  transition: {
    duration: 1,
    ease: [0.76, 0, 0.24, 1],
    repeatType: "reverse",
    repeat: Infinity,
    repeatDelay: 1,
  },
})<{ imgUrl: string }>`
  ${CardBase}
  background-image: url(${(props) => baseUrl + props.imgUrl});
`;

const StyledCard = styled.div<{ imgUrl: string }>`
  ${CardBase}
  background-image: url(${(props) => baseUrl + props.imgUrl});
`;
