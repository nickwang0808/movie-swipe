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
    return `linear-gradient(25deg, rgba(255, 255, 255, 0) 52%, rgba(255, 255, 255, 0.2) 53%, rgba(255, 255, 255, 0.2) 100%), linear-gradient(360deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 10%), url(${url})`;
  };

  return (
    <>
      <div
        className={style.poster_vote}
        style={{ backgroundImage: assignUrlToPoster(baseUrl + imgUrl) }}
      >
        {/* {voteType && (
          <div className={style.voted_thumb}>
            {voteType === "like" && <VoteLarge_Up />}
            {voteType === "dislike" && <VoteLarge_Down />}
          </div>
        )} */}
        {/* <h3 className="poster_overview"> */}
        {/* PG-13 | 2h 3min | Adventure, Crime, Drama | 2020 (USA) */}
        {/* {` ${movieInfo?.genre.join(", ")} | ${movieInfo?.released}`} */}
        {/* </h3> */}
      </div>
    </>
  );
}
