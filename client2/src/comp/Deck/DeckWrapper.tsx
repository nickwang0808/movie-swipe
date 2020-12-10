import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

export default function DeckWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledMotionDiv
      animate={{ opacity: 1, marginTop: "0rem" }}
      initial={{ opacity: 0, marginTop: " 2rem" }}
      transition={{
        delay: 0,
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </StyledMotionDiv>
  );
}

const StyledMotionDiv = styled(motion.div)`
  margin: 0 auto;
  position: relative;
`;
