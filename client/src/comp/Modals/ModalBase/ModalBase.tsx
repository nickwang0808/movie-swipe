import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import CloseButtonIcon from "../../../Assets/svg/CloseButtonIcon";
import ModalScrim from "./ModalScrim";

interface IModal {
  children: React.ReactNode;
  closeAction: () => void;
}

export default function ModalBase({ children, closeAction }: IModal) {
  return (
    <>
      <ModalScrim closeAction={closeAction} />
      <StyledMotionDiv
        key="modal_container"
        animate={{
          transform: "translate(0, -50%) scale3d(1, 1, 1)",
          opacity: 1,
        }}
        initial={{
          transform: "translate(0, -50%) scale3d(0.95, 0.95, 1)",
          opacity: 0,
        }}
        exit={{
          transform: "translate(0, -50%) scale3d(0.95, 0.95, 1)",
          opacity: 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <StyledButtonClose onClick={closeAction}>
          <CloseButtonIcon />
        </StyledButtonClose>
        {children}
      </StyledMotionDiv>
    </>
  );
}

const StyledMotionDiv = styled(motion.div)`
  position: absolute;
  background-color: var(--light);
  margin: 3rem;
  border-radius: 0.4rem;
  /* padding: 3rem; */
  top: calc(50% - var(--nav));
  left: 0;
  right: 0;
  transform: translate(0, -50%);
  z-index: 10001;
`;

const StyledButtonClose = styled.div`
  fill: var(--light);
  position: absolute;
  right: 0;
  top: 0;
  width: 70px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 6;
`;
