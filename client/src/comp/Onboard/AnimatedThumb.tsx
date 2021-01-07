import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components/macro";
import {
  OnBoardThumbDown,
  OnBoardThumbUp,
} from "../../Assets/svg/OnBoardThumb";

export default function AnimatedThumb() {
  return (
    <>
      <StyledThumb
        animate={{
          opacity: [0, 1, 0],
          scale: [0.9, 1, 0.9],
          translateX: ["-50%", "20%", "-50%"],
        }}
      >
        <OnBoardThumbUp />
      </StyledThumb>

      <StyledThumb
        animate={{
          opacity: [1, 0, 1],
          scale: [1, 0.9, 1],
          translateX: ["-120%", "-50%", "-120%"],
        }}
      >
        <OnBoardThumbDown />
      </StyledThumb>
    </>
  );
}

const StyledThumb = styled(motion.div).attrs({
  transition: {
    duration: 1,
    times: [0, 1, 2],
    ease: [0.85, 0, 0.15, 1],
    repeatType: "reverse",
    repeat: Infinity,
    repeatDelay: 1,
  },
})`
  z-index: 1000;
  position: absolute;
  top: 25%;
  /* bottom: 0; */
  height: 128px;
  left: 50%;
  transform: translateX(-50%);
`;
