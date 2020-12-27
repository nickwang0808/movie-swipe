import { motion } from "framer-motion";
import React from "react";
import styled, { css } from "styled-components/macro";

interface IProps {
  counter: number | undefined;
  align?: boolean;
}

export default function Badge({ counter, align = false }: IProps) {
  if (!counter || counter === 0) return null;
  return (
    <BadgeElement
      align={align}
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

const BadgeElement = styled(motion.div)<{ align: boolean }>`
  border-radius: 3px;
  width: 2rem;
  height: 2rem;
  background-color: var(--positive);
  color: var(--dark);
  font-size: 1.5rem;
  text-align: center;
  line-height: 2rem;

  ${(props) =>
    !props.align &&
    css`
      display: inline-block;
      position: absolute;
      left: 55%;
      top: 0;
    `}
`;
