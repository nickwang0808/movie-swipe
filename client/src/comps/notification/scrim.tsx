import React from "react";
import style from "./notification.module.css";
import { motion } from "framer-motion";

export default function ModalScrim(){
  return (
    <>
      <motion.div
        // animate={{ opacity: 1 }}
        // initial={{  opacity: 0 }}
        transition={{
          duration: 1,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className={style.scrim}
      >
      </motion.div>
    </>
  );
}
