import React from "react";
import style from "./MainPoster.module.css";
// import VoteDown from "./VoteLarge_Down";

// import VoteLarge_Up from "./VoteLarge_Up";
// import VoteLarge_Down from "./VoteLarge_Down";

// import { motion } from "framer-motion";
import baseUrl from "../../../HelperFunctions/ImgBaseUrl";
import { Result } from "../../../db-operations/useGetMovies";

interface IMainPosterProps {
  imgUrl: string;
  voteType?: "like" | "dislike" | undefined;
  movie: Result;
}

export default function MainPoster({ imgUrl }: IMainPosterProps) {
  const assignUrlToPoster = (url: string) => {
    return `linear-gradient(25deg, rgba(255, 255, 255, 0) 52%, rgba(255, 255, 255, 0.2) 53%, rgba(255, 255, 255, 0.2) 100%), url(${url})`;
  };

  return (
    <div className={style.card}>
      <div
        className={style.poster_vote}
        style={{ backgroundImage: assignUrlToPoster(baseUrl + imgUrl) }}
      ></div>
    </div>
  );
}
