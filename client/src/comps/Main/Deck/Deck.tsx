import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Result } from "../../../db-operations/useGetMovies";
import baseUrl from "../../../HelperFunctions/ImgBaseUrl";
import MainPoster from "../MainPoster/MainPoster";
import style from "./Deck.module.css";

interface IDeckProp {
  handleLike: (movieID: number) => void;
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
  const [XCenter, setXCenter] = useState(0);

  useEffect(() => {
    setXCenter(window.innerWidth / 2);
  }, []);

  return (
    <>
      <div className="container_poster">
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
                      if (x > XCenter * 1.5) {
                        setIsLike(true);
                        handleLike(movie.id);
                      } else if (x < XCenter * 0.5) {
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
                        ? { x: "1000px", rotate: 50, zIndex: 100 }
                        : {
                            x: "-1000px",
                            rotate: -50,
                            zIndex: 100,
                          }
                    }
                    layout
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <MainPoster imgUrl={movie.poster_path} />
                  </motion.div>
                );
              })
              .reverse()}
        </AnimatePresence>
      </div>
    </>
  );
}
