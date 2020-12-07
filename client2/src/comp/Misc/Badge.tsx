import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

export default function Badge({ counter }: { counter: number }) {
  return (
    <BadgeElement
      animate={{ scale: [0, 1.5, 1, 1], rotateZ: [0, 15, 0, 0] }}
      transition={{
        times: [0, 0.25, 1, 1.5],
        duration: 2,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {counter}
    </BadgeElement>
  );
}

const BadgeElement = styled(motion.div)`
  display: inline-block;
  border-radius: 3px;
  width: 2rem;
  height: 2rem;
  position: absolute;
  background-color: var(--positive);
  color: var(--dark);
  font-size: 1.5rem;
  text-align: center;
  line-height: 2rem;
  left: 55%;
`;
