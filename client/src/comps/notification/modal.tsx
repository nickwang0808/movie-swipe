import React from "react";
import style from "./notification.module.css";
import ModalScrim from "./scrim";
import { motion } from "framer-motion";

export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ModalScrim />
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
        {children}
      </motion.div>
    </>
  );
}
