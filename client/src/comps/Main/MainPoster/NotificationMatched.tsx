import React from "react";
import style from "./NotificationMatched.module.css";
import { motion } from "framer-motion";
import { IUserInfo } from "../../../db-operations/useGetAllMatches";
import baseUrl from "../../../HelperFunctions/ImgBaseUrl";

interface INotificationMatched {
  setShowMatched: () => void;
  movieId: number;
  matchedWith: IUserInfo[];
  poster: string;
  title: string;
}

export default function NotificationMatched({
  movieId,
  matchedWith,
  setShowMatched,
  poster,
  title,
}: INotificationMatched) {
  return (
    <>
      <motion.div
        className={style.matched_banner_large}
        animate={{
          skew: [-15, -15, -15, -15],
          opacity: [0, 1, 1, 0],
          left: ["40%", "50%", "50%", "50%"],
          translateX: ["-50%", "-50%", "-50%", "-50%"],
          top: [
            "calc(40% - var(--header) + 128px + 3rem)",
            "calc(40% - var(--header) + 128px + 3rem)",
            "calc(40% - var(--header) + 200px + 3rem)",
            "calc(40% - var(--header) + 200px + 3rem)",
          ],
        }}
        transition={{
          times: [0, 0.5, 1, 1],
          duration: 2,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className={style.forceSkew}>MATCH!</div>
      </motion.div>
      <div className={style.container_matched}>
        <motion.div
          className={style.container_matched_styling}
          animate={{ visibility: "visible", height: "100%", y: 0 }}
          initial={{ visibility: "hidden", height: "0%", y: -20 }}
          transition={{
            delay: 1,
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
        ></motion.div>
        <motion.div
          className={style.matched_poster}
          onClick={setShowMatched} // close the modal
          style={{ backgroundImage: `url(${baseUrl + poster})` }}
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          transition={{
            delay: 1.15,
            type: "spring",
            stiffness: 200,
            damping: 15,
            velocity: 1,
          }}
        ></motion.div>
        <motion.div
          className={style.matched_details}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -10 }}
          transition={{
            delay: 1.2,
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className={style.matched_banner}>
            <div className={style.forceSkew}>MATCH!</div>
          </div>
          <div className={style.matched_text}>
            <p>
              <strong>{matchedWith.map((user) => user.name).join(", ")}</strong>
              &nbsp;want to watch&nbsp;<strong>{title}</strong>&nbsp;too!
            </p>
          </div>
          <div className={style.matched_getdetailsbtn}>
            <a href="#">Details</a>
          </div>
        </motion.div>
      </div>
    </>
  );
}
