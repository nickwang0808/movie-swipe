import React, { useContext, useEffect, useState } from "react";
import FilterButton from "../ButtonComps/FilterButton";
import Logo from "../Decorators/Logo";
import Filters from "../filter/Filters";
import NotificationMatched from "./MainPoster/NotificationMatched";
import VoteLarge_Down from "./MainPoster/VoteLarge_Down";
import VoteLarge_Up from "./MainPoster/VoteLarge_Up";
import UpdateLikeToDB from "../../db-operations/UpdateLikeToDB";
import MovieDetails from "../movieDetails/MovieDetails";
import baseUrl from "../../HelperFunctions/ImgBaseUrl";
import backgroundStyle from "../../HelperFunctions/backgroundStyleMaker";
import VotingActions from "./VotingActions";
import { AnimatePresence, motion } from "framer-motion";
import Deck from "./Deck/Deck";
import { UserContext } from "../../store";
import { Route } from "react-router";

interface ICompProps {
  userId: string;
}

export default function LikeOrNo({ userId }: ICompProps) {
  const [filterOn, setFilterOn] = useState(false);
  const [voteType, setVoteType] = useState<"like" | "dislike">();
  const [isLike, setIsLike] = useState<boolean>();

  const { movieListInDeck, handleNext } = useContext(UserContext);

  const handleLike = (movieID: number) => {
    UpdateLikeToDB(userId, movieID, true);
    console.log("like");
    handleNext();
    setVoteType("like");
  };
  const handleDislike = (movieID: number) => {
    UpdateLikeToDB(userId, movieID, false);
    console.log("dislike");
    handleNext();
    setVoteType("dislike");
  };

  useEffect(() => {
    if (movieListInDeck) {
      if (isLike === true) {
        handleLike(movieListInDeck[0].id);
      }
      if (isLike === false) {
        handleDislike(movieListInDeck[0].id);
      }
    }
    // eslint-disable-next-line
  }, [isLike]);

  return (
    <>
      <Route exact path="/home/details">
        {movieListInDeck && (
          <MovieDetails
            movieID={movieListInDeck[0].id}
            handleDislike={handleDislike}
            handleLike={handleLike}
            showVoting={true}
            goTo="/home"
          />
        )}
      </Route>
      <Route exact path="/home">
        <AnimatePresence>
          {filterOn && <Filters setFilterOn={setFilterOn} />}
        </AnimatePresence>
        <div className="background_container">
          <div
            className="background"
            style={backgroundStyle(
              movieListInDeck ? baseUrl + movieListInDeck[0].poster_path : ""
            )}
          />
        </div>
        <div className="container_header">
          <Logo />
          <FilterButton setFilterOn={setFilterOn} />
        </div>
        {/* <motion.div 
        animate={{left: "130%"}}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="VoteUpBG_anim"></motion.div> */}
        {/* <div className="loader"></div> */}
        {/* <NotificationMatched /> */}
        {/* < VoteLarge_Up /> */}
        {/* < VoteLarge_Down /> */}
        <Deck
          movieListInDeck={movieListInDeck}
          handleLike={handleLike}
          handleDislike={handleDislike}
          setIsLike={setIsLike}
          isLike={isLike}
        />
        <VotingActions
          handleDislike={() => {
            if (movieListInDeck) {
              if (isLike === false) {
                handleDislike(movieListInDeck[0].id);
              }
              setIsLike(false);
            }
          }}
          handleLike={() => {
            if (movieListInDeck) {
              if (isLike === true) {
                handleLike(movieListInDeck[0].id);
              }
              setIsLike(true);
            }
          }}
          goTo="/home/details"
          showDetail="Details"
        />
      </Route>
    </>
  );
}
