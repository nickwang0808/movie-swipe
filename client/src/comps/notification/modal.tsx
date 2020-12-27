import React from "react";
import style from "./notification.module.css";
import sharedStyle from "../ButtonComps/ButtonComps.module.css";

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
        className={style.container_modal}
      >
        <div className={sharedStyle.btn_close} onClick={closeAction}>
          <svg
            width="20"
            height="19"
            viewBox="0 0 20 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.98531 10.9853L2.00003 18.9706L0.58582 17.5563L8.57109 9.57108L1.00002 2L2.41423 0.585786L9.98531 8.15686L17.5564 0.585786L18.9706 2L11.3995 9.57108L19.3848 17.5563L17.9706 18.9706L9.98531 10.9853Z"
            />
          </svg></div>
        {children}
      </motion.div>
    </>
  );
}
