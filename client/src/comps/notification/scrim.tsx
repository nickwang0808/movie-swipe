import React from "react";
import style from "./notification.module.css";
import { motion } from "framer-motion";

interface iModalScrim {
  closeAction: () => void;
}

export default function ModalScrim({ closeAction }: iModalScrim) {
  return (
    <>
      <motion.div
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
        className={style.scrim}
      ></motion.div>
    </>
  );
}
