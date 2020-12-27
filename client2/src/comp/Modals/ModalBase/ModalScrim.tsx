import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

interface IModalScrim {
  closeAction: () => void;
}

export default function ModalScrim({ closeAction }: IModalScrim) {
  return (
    <StyledMotionDiv
      onClick={closeAction}
      key="modal_scrim"
      animate={{
        opacity: 1,
      }}
      initial={{
        opacity: 0,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
    />
  );
}

const StyledMotionDiv = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1000;
`;
