import { AnimatePresence, motion } from "framer-motion";
import { relative } from "path";
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
}

export default function Deck({
  movieListInDeck,
  handleLike,
  handleDislike,
  isLike,
  setIsLike,
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
        <AnimatePresence>
          {movieListInDeck &&
            movieListInDeck
              .map((movie, i) => {
                return (
                  <motion.div
                    className={style.card}
                    key={movie.id}
                    drag={i === 0 ? true : false}
                    onDragEnd={(e, info) => {
                      const x = info.point.x;
                      if (x > XCenter * 1.6) {
                        setIsLike(true);
                        handleLike(movie.id, movie.poster_path, movie.title);
                      } else if (x < XCenter * 0.4) {
                        setIsLike(false);
                        handleDislike(movie.id);
                      } else {
                      }
                    }}
                    dragElastic={1}
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    style={{
                      originY: 1,
                      top: 4 * i,
                      scale: 1 - i * 0.07,
                    }}
                    exit={
                      isLike
                        ? { x: "700px", /* rotate: 20, */ zIndex: 100 }
                        : {
                            x: "-700px",
                            /*  rotate: -20, */
                            zIndex: 100,
                          }
                    }
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
        </AnimatePresence>
      </motion.div>
    </>
  );
}
