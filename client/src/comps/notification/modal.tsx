import React from "react";
import style from "./notification.module.css";
import ModalScrim from "./scrim";
import { motion } from "framer-motion";

interface IModal {
  children: React.ReactNode;
  closeAction: () => void;
}

export default function Modal({ children, closeAction }: IModal) {
  return (
    <>
      <ModalScrim closeAction={closeAction} />
      <motion.div
        // animate={{
        //   transform: "translate(0, -50%) scale3d(1, 1, 1)",
        //   opacity: 1,
        // }}
        // initial={{
        //   transform: "translate(0, -50%) scale3d(0.9, 0.9, 1)",
        //   opacity: 0,
        // }}
        // transition={{
        //   ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        // }}
        className={style.container_modal}
      >
        <button onClick={closeAction}>Close</button>
        {children}
      </motion.div>
    </>
  );
}
