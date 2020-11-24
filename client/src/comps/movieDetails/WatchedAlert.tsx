import React from "react";
import style from "./WatchedAlert.module.css";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import { AnimatePresence, motion } from "framer-motion";
import handleWatched from "../../db-operations/handleWatched";
import { IUserInfo } from "../../store";

interface IMovieDetails {
  matches?: IUserInfo[] | undefined;
  movieId: number;
  watchedWith?: { email: string; name: string; uid: string }[] | undefined;
  setShowModal: (arg: boolean) => void;
  userId: string;
}

const Ease = [0.16, 1, 0.3, 1];

export default function WatchedAlert({
  matches,
  watchedWith,
  setShowModal,
  movieId,
  userId,
}: IMovieDetails) {
  return (
    <>
      <AnimatePresence>
        <div>
          <div className={style.who_matched}>
            <div className={style.matched_animation_cover}>
              <motion.div
                key="watched1"
                className={style.matched_animation}
                animate={watchedWith ? { left: "7rem" } : {}}
                transition={{
                  duration: 1,
                  ease: Ease,
                }}
              >
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  Watched with{" "}
                  <strong>
                    {watchedWith?.map((info) => info.name).join(", ")}
                  </strong>
                </motion.p>
              </motion.div>
            </div>
            <motion.div
              key="watched2"
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                ease: Ease,
              }}
              className={`${style.matched_thumb}`}
            >
              <svg
                width="24"
                height="21"
                viewBox="0 0 24 21"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.7988 7.4999H21.2299L21.2299 7.49988C22.757 7.49988 23.9999 8.7428 23.9999 10.2699C23.9999 10.4794 23.9758 10.6888 23.9289 10.8932L22.3278 18.2409C21.8833 19.8646 20.3957 20.9992 18.7111 20.9992L11.2499 20.9999C9.18231 20.9999 7.49994 19.3175 7.49994 17.2499V9.40126C7.49994 8.47402 7.84125 7.58339 8.46161 6.89272L14.4426 0.24818C14.6293 0.0409044 14.9135 -0.0447891 15.1816 0.0225937L16.2831 0.297985C16.968 0.468639 17.5217 0.938122 17.8022 1.58558C18.0827 2.23232 18.0476 2.95668 17.7048 3.57265L16.1425 6.38589C15.955 6.72427 16.0869 7.01943 16.1521 7.13003C16.2172 7.24136 16.4113 7.4999 16.7988 7.4999ZM0 19.5002V7.5002C0 6.67174 0.67154 6.0002 1.5 6.0002H6V21.0002H1.5C0.67154 21.0002 0 20.3286 0 19.5002Z"
                />
              </svg>
            </motion.div>
            {matches && (
              <motion.div
                key="watched3"
                exit={{ opacity: 0, margin: "0rem" }}
                transition={{
                  duration: 1,
                  ease: Ease,
                  delay: 1,
                }}
                className={`${style.matched_partner}`}
              >
                <div className={style.matchName}>
                  <span className="heavy">
                    {matches?.map((match) => match.name).join(", ")}
                  </span>
                  &nbsp;wants to watch this too!
                </div>
              </motion.div>
            )}
          </div>
        </div>
        {matches && (
          <motion.div
            key="watched4"
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: Ease }}
            className={`${sharedstyle.btn} ${sharedstyle.btn_outline} ${style.btn_watched}`}
            onClick={() => {
              matches.length > 1
                ? setShowModal(true)
                : handleWatched(userId, movieId, [matches[0].uid]);
            }}
          >
            We've watched this!
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
