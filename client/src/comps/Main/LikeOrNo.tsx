import React, { useContext, useEffect, useState } from "react";
import FilterButton from "../ButtonComps/FilterButton";
import Logo from "../Decorators/Logo";
import Filters from "../filter/Filters";
import NotificationMatched from "./MainPoster/NotificationMatched";
import VoteLargeDown from "./CardAnimationParts/VoteLargeDown";
import VoteLargeUp from "./CardAnimationParts/VoteLargeUp";
import UpdateLikeToDB from "../../db-operations/UpdateLikeToDB";
import MovieDetails from "../movieDetails/MovieDetails";
import baseUrl from "../../HelperFunctions/ImgBaseUrl";
import backgroundStyle from "../../HelperFunctions/backgroundStyleMaker";
import VotingActions from "./VotingActions";
import style from "./style.module.css";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Deck from "./Deck/Deck";
import { UserContext } from "../../store";
import { Route, useHistory } from "react-router";
import { cloudFn } from "../../firebase/config";
import { IUserInfo } from "../../db-operations/useGetAllMatches";

interface ICompProps {
  userId: string;
}

interface IMatchNotification {
  movieId: number;
  matchedWith: IUserInfo[];
  poster: string;
  title: string;
}

export default function LikeOrNo({ userId }: ICompProps) {
  const [filterOn, setFilterOn] = useState(false);
  const [showMatched, setShowMatched] = useState<IMatchNotification | null>();
  const {
    movieListInDeck,
    handleNext,
    userProfile,
    genrePref,
    size,
  } = useContext(UserContext);
  const screenWidth = size.width;

  const history = useHistory();

  const handleLike = async (movieID: number, poster: string, title: string) => {
    UpdateLikeToDB(userId, movieID, true);
    console.log("like");
    handleNext();
    if (userProfile && userProfile.friendsIdOnly.length > 0) {
      const response = await cloudFn.httpsCallable("checkMatchesWhileSwiping")({
        myLike: movieID,
        myFriends: userProfile?.friendsIdOnly,
      });
      if (response.data.length > 0) {
        setShowMatched({
          movieId: movieID,
          title,
          poster,
          matchedWith: response.data,
        });
      }
    }
  };
  const handleDislike = (movieID: number) => {
    UpdateLikeToDB(userId, movieID, false);
    console.log("dislike");
    handleNext();
  };

  useEffect(() => {
    if (showMatched) {
      setTimeout(() => {
        setShowMatched(undefined);
      }, 4000);
    }
  }, [showMatched]);

  const xMotionValue = useMotionValue(0); // to control the deck via button
  const likeSlider = useMotionValue(0); // let deck control other stuff
  const backgroundSlide = useTransform(likeSlider, (value) => value * 2.5);

  const thumbMotionValue = useMotionValue(0); // let deck control other stuff
  const thumbX = useTransform(thumbMotionValue, (value) => value / 1.5);
  const thumbOpacityMotionValue = useMotionValue(0);
  const thumbOpacity = useTransform(
    thumbOpacityMotionValue,
    (value) => Math.abs(value / 300) // the higher num the slower it adds opacity
  );

  const animateSliderAndThumb = (direction: number, thumbDirection: 1 | -1) => {
    animate(likeSlider, direction * 1.2, {
      type: "tween",
      duration: 1,
      ease: [0.33, 1, 0.68, 1],
      onComplete: () => {
        likeSlider.set(0); // don't remove this
      },
    });

    // this controls where the thumb to animate to
    animate(thumbMotionValue, screenWidth * thumbDirection, {
      type: "tween",
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    });

    // this controls thumb opacity
    animate(thumbOpacityMotionValue, [300, 0], {
      ease: "easeIn",
      duration: 0.5,
      onComplete: () => {},
    });
  };

  return (
    <>
      {showMatched && (
        <NotificationMatched
          movieId={showMatched.movieId}
          poster={showMatched.poster}
          title={showMatched.title}
          setShowMatched={() => setShowMatched(null)}
          matchedWith={showMatched.matchedWith}
        />
      )}
      <Route path="/home/details/:id">
        {movieListInDeck && (
          <MovieDetails
            handleDislike={() => handleDislike(movieListInDeck[0].id)}
            handleLike={() =>
              handleLike(
                movieListInDeck[0].id,
                movieListInDeck[0].poster_path,
                movieListInDeck[0].title
              )
            }
            MiddleButtonText="Posters"
          />
        )}
      </Route>
      <Route exact path="/home">
        <AnimatePresence>
          {filterOn && genrePref && (
            <Filters
              setFilterOn={setFilterOn}
              userId={userId}
              genrePref={genrePref}
            />
          )}
        </AnimatePresence>
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="background_container"
        >
          <div
            className="background"
            style={backgroundStyle(
              movieListInDeck ? baseUrl + movieListInDeck[0].poster_path : ""
            )}
          />
        </motion.div>
        <motion.div
          animate={{ opacity: 1, paddingTop: "0rem" }}
          initial={{ opacity: 0, paddingTop: "2rem" }}
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`${"container_header"} ${style.filterplacement}`}
        >
          <Logo />
          <FilterButton setFilterOn={setFilterOn} />
        </motion.div>

        <motion.div
          // "green slider"
          style={{ skew: "-15deg", x: backgroundSlide }}
          className="VoteUpBG_anim"
        ></motion.div>
        <motion.div
          // "red slider"
          style={{ skew: "15deg", x: backgroundSlide }}
          className="VoteDownBG_anim"
        ></motion.div>
        <VoteLargeUp thumbX={thumbX} thumbOpacity={thumbOpacity} />
        <VoteLargeDown thumbX={thumbX} thumbOpacity={thumbOpacity} />
        <Deck
          movieListInDeck={movieListInDeck}
          handleLike={handleLike}
          handleDislike={handleDislike}
          xMotionValue={xMotionValue}
          likeSlider={likeSlider}
          thumbMotionValue={thumbMotionValue}
          thumbOpacityMotionValue={thumbOpacityMotionValue}
        />
        {movieListInDeck && (
          <VotingActions
            handleLike={() => {
              const card = movieListInDeck[0];
              animate(xMotionValue, 500, {
                type: "tween",
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
                onComplete: () => {
                  xMotionValue.set(0);
                  handleLike(card.id, card.poster_path, card.title);
                },
              });
              animateSliderAndThumb(screenWidth, 1);
            }}
            handleDislike={() => {
              animate(xMotionValue, -500, {
                type: "tween",
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1],
                onComplete: () => {
                  xMotionValue.set(0);
                  handleDislike(movieListInDeck[0].id);
                },
              });
              animateSliderAndThumb(-screenWidth, -1);
            }}
            MiddleButtonText="Details"
            handleClickMiddleButton={() =>
              history.push(`/home/details/${movieListInDeck[0].id}`)
            }
          />
        )}
      </Route>
    </>
  );
}
