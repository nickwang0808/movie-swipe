import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import baseUrl from "../../Helper/TmdbBaseUrl";

interface IProp {
  ImgUrl: string;
}

export default function MainBackground({ ImgUrl }: IProp) {
  return (
    <Wrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{
        delay: 0.1,
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Background ImgUrl={ImgUrl} />
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  height: 100%;
  min-height: 100%;
  overflow: hidden;
`;

const Background = styled.div<IProp>`
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),
    url(${(props) => baseUrl + props.ImgUrl});

  filter: blur(8px);
  -webkit-filter: blur(8px);
  background-position: center;
  transform: scale(2);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -10;
  height: 100%;
  min-height: 100%;
`;
