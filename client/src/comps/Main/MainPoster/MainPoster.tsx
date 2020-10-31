import React from "react";
import style from "./MainPoster.module.css";
// import VoteDown from "./VoteLarge_Down";

import VoteLarge_Up from "./VoteLarge_Up";
import VoteLarge_Down from "./VoteLarge_Down";

import { motion } from "framer-motion";

interface IMainPosterProps {
  imgUrl_1: string;
  imgUrl_2: string;
  imgUrl_3: string;
  voteType: "like" | "dislike" | undefined;
}

export default function MainPoster({
  imgUrl_1,
  imgUrl_2,
  imgUrl_3,
  voteType,
}: IMainPosterProps) {
  const assignUrlToPoster = (url: string) => {
    return `linear-gradient(25deg, rgba(255, 255, 255, 0) 52%, rgba(255, 255, 255, 0.2) 53%, rgba(255, 255, 255, 0.2) 100%), linear-gradient(360deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 10%), url(${url})`;
  };

  return (
    <>
      <div
        className="poster_vote"
        id="poster_4"
        style={{ backgroundImage: assignUrlToPoster(imgUrl_3) }}
      />
      <div
        className="poster_vote"
        id="poster_3"
        style={{ backgroundImage: assignUrlToPoster(imgUrl_3) }}
      />
      <div
        className="poster_vote"
        id="poster_2"
        style={{ backgroundImage: assignUrlToPoster(imgUrl_2) }}
      />
      <div
        className="poster_vote"
        id="poster_1"
        style={{ backgroundImage: assignUrlToPoster(imgUrl_1) }}
      >
        {/* {voteType && (
          <div className={style.voted_thumb}>
            {voteType === "like" && <VoteLarge_Up />}
            {voteType === "dislike" && <VoteLarge_Down />}
          </div>
        )} */}
        <h3 className="poster_overview">
          {/* PG-13 | 2h 3min | Adventure, Crime, Drama | 2020 (USA) */}
          {/* {` ${movieInfo?.genre.join(", ")} | ${movieInfo?.released}`} */}
        </h3>
      </div>
    </>
  );
}
