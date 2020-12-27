import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

export default function Banner() {
  return (
    <StyledMotionDiv
      animate={{
        skew: [-15, -15, -15, -15],
        opacity: [0, 1, 1, 0],
        left: ["40%", "50%", "50%", "60%"],
        translateX: ["-50%", "-50%", "-50%", "-50%"],
      }}
      transition={{
        // times: [0, 0.5, 1, 1.5],
        duration: 3,
        ease: [0.16, 1, 0.3, 1],
        // ease: "easeInOut",
      }}
    >
      <div>MATCH!</div>
    </StyledMotionDiv>
  );
}

const StyledMotionDiv = styled(motion.div)`
  position: absolute;
  margin: auto;
  top: calc(40% - var(--header) + 128px + 3rem);
  z-index: 1001;
  padding: 0.3rem 4rem;
  background-color: var(--positive);
  font-size: 5rem;
  font-weight: 600;
  border-radius: 0.75rem;
  width: fit-content;

  & div {
    transform: skewX(15deg);
  }
`;
