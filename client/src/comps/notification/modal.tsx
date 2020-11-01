import React from "react";
import style from "./notification.module.css";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import ModalScrim from "./scrim";
import { motion } from "framer-motion";

export default function Modal(){
  return (
    <>
        <ModalScrim />
        <motion.div
            animate={{ transform: "translate(0, -50%) scale3d(1, 1, 1)", opacity: 1 }}
            initial={{ transform: "translate(0, -50%) scale3d(0.9, 0.9, 1)", opacity: 0 }}
            transition={{
              ease: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className={style.container_modal}
        >
          <h1 className={style.title}>Remove friend?</h1>
          <p className={style.body}>Are you sure you want to remove TWernisch@gmail.com from your friends list?</p>
          <div className={style.container_actions}>
          <div className={`${sharedstyle.btn} ${sharedstyle.secondary}`}>Cancel</div>
            <div className={`${sharedstyle.btn} ${style.primary}`}>Yes, do it!</div>
          </div>
      </motion.div>
    </>
  );
}
