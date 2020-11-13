import { animate, motion, MotionValue } from "framer-motion";
import React, { useContext } from "react";
import { Result } from "../../../db-operations/useGetMovies";
import { UserContext } from "../../../store";
import MainPoster from "../MainPoster/MainPoster";
import style from "./Deck.module.css";

interface IDeckProp {
  handleLike: (movieID: number, poster: string, title: string) => void;
  handleDislike: (movieID: number) => void;
  movieListInDeck: Result[] | undefined;
  isLike: boolean | undefined;
  setIsLike: (arg: boolean) => void;
  xMotionValue: MotionValue<number>;
}

export default function Deck({
  movieListInDeck,
  handleLike,
  handleDislike,
  isLike,
  setIsLike,
  xMotionValue,
}: IDeckProp) {
  const { size } = useContext(UserContext);
  const XCenter = size.XCenter;

  return (
    <>
      <motion.div
        animate={{ opacity: 1, marginTop: "0rem" }}
        initial={{ opacity: 0, marginTop: " 2rem" }}
        transition={{
          delay: 0,
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="container_poster"
      >
        {movieListInDeck &&
          movieListInDeck
            .map((movie, i) => {
              if (i !== 0)
                return (
                  <motion.div
                    className={style.card}
                    key={movie.id}
                    layout
                    style={{
                      originY: 1,
                      top: 4 * i,
                      scale: 1 - i * 0.07,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "circOut",
                    }}
                  >
                    <MainPoster imgUrl={movie.poster_path} movie={movie} />
                  </motion.div>
                );
              return (
                <motion.div
                  className={style.card}
                  key={movie.id}
                  drag={i === 0 ? true : false}
                  onDragEnd={(e, info) => {
                    const xPosition = info.point.x;
                    if (xPosition > XCenter * 1.6) {
                      animate(xMotionValue, 500, {
                        type: "spring",
                        onComplete: () => {
                          xMotionValue.set(0);
                          handleLike(movie.id, movie.poster_path, movie.title);
                        },
                      });
                    } else if (xPosition < XCenter * 0.4) {
                      animate(xMotionValue, -500, {
                        type: "spring",
                        onComplete: () => {
                          xMotionValue.set(0);
                          handleDislike(movie.id);
                        },
                      });
                    }
                  }}
                  dragElastic={0.8}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  style={{
                    originY: 1,
                    top: 4 * i,
                    scale: 1 - i * 0.07,
                    x: xMotionValue,
                  }}
                  layout
                  transition={{
                    duration: 0.5,
                    ease: "circOut",
                  }}
                >
                  <MainPoster imgUrl={movie.poster_path} movie={movie} />
                </motion.div>
              );
            })
            .reverse()}
      </motion.div>
    </>
  );
}
