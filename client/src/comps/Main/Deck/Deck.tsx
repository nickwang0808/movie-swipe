import { animate, motion, MotionValue } from "framer-motion";
import React, { useContext, useState } from "react";
import { start } from "repl";
import { Result } from "../../../db-operations/useGetMovies";
import { UserContext } from "../../../store";
import MainPoster from "../MainPoster/MainPoster";
import style from "./Deck.module.css";

interface IDeckProp {
  handleLike: (movieID: number, poster: string, title: string) => void;
  handleDislike: (movieID: number) => void;
  movieListInDeck: Result[] | undefined;
  xMotionValue: MotionValue<number>;
  likeSlider: MotionValue<number>;
  thumbMotionValue: MotionValue<number>;
  thumbOpacityMotionValue: MotionValue<number>;
}

export default function Deck({
  movieListInDeck,
  handleLike,
  handleDislike,
  xMotionValue,
  likeSlider,
  thumbMotionValue,
  thumbOpacityMotionValue,
}: IDeckProp) {
  const { size } = useContext(UserContext);
  const screenWidth = size.width;

  const swipeDistance = screenWidth * 0.15;

  const [startPosition, setStartPosition] = useState<number>();

  const animateSliderAndThumb = (direction: number, thumbDirection: 1 | -1) => {
    animate(likeSlider, direction * 1.2, {
      type: "tween",
      duration: 1,
      ease: [0.33, 1, 0.68, 1],
    });
    // this controls where the thumb to animate to
    animate(thumbMotionValue, screenWidth * thumbDirection, {
      type: "tween",
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    });
    // thumbOpacity is controlled by drag, which will fade out after release automatically
  };

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
                    className={style.card_container}
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
                  className={style.card_container}
                  key={movie.id}
                  drag
                  onViewportBoxUpdate={(_, delta) => {
                    likeSlider.set(delta.x.translate);
                    thumbMotionValue.set(delta.x.translate);
                    thumbOpacityMotionValue.set(delta.x.translate);
                  }}
                  onDragStart={(e, info) => {
                    const xPosition = info.point.x;
                    setStartPosition(xPosition);
                  }}
                  onDragEnd={(e, info) => {
                    const xPosition = info.point.x;
                    if (startPosition) {
                      if (
                        xPosition >
                        (startPosition as number) + swipeDistance
                      ) {
                        animate(xMotionValue, screenWidth, {
                          type: "tween",
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                          onComplete: () => {
                            xMotionValue.set(0);
                            /* not pulling it out because handlelike is a pain is the
                          ass to assign types  */
                            handleLike(
                              movie.id,
                              movie.poster_path,
                              movie.title
                            );
                          },
                        });
                        animateSliderAndThumb(screenWidth, 1);
                      } else if (
                        xPosition <
                        (startPosition as number) - swipeDistance
                      ) {
                        animate(xMotionValue, -screenWidth, {
                          type: "tween",
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                          onComplete: () => {
                            xMotionValue.set(0);
                            handleDislike(movie.id);
                          },
                        });
                        animateSliderAndThumb(-screenWidth, -1);
                      }
                    }
                  }}
                  dragElastic={1}
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
