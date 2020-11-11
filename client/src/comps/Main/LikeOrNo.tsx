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
  const [voteType, setVoteType] = useState<"like" | "dislike">();
  const [isLike, setIsLike] = useState<boolean>();
  const [showMatched, setShowMatched] = useState<IMatchNotification | null>();
  const { movieListInDeck, handleNext, userProfile, genrePref } = useContext(
    UserContext
  );

  const handleLike = async (movieID: number, poster: string, title: string) => {
    UpdateLikeToDB(userId, movieID, true);
    console.log("like");
    handleNext();
    setVoteType("like");
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
    setVoteType("dislike");
  };

  // useEffect(() => {
  //   if (movieListInDeck) {
  //     if (isLike === true) {
  //       const card = movieListInDeck[0];
  //       handleLike(card.id, card.poster_path, card.title);
  //     }
  //     if (isLike === false) {
  //       handleDislike(movieListInDeck[0].id);
  //     }
  //   }
  //   // eslint-disable-next-line
  // }, [isLike]);

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
            // movieID={movieListInDeck[0].id}
            handleDislike={handleDislike}
            handleLike={handleLike}
            showVoting={true}
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
          className="container_header"
        >
          <Logo />
          <FilterButton setFilterOn={setFilterOn} />
        </motion.div>
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
        {movieListInDeck && (
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
                  const card = movieListInDeck[0];
                  handleLike(card.id, card.title, card.poster_path);
                }
                setIsLike(true);
              }
            }}
            goTo={`/home/details/${movieListInDeck[0].id}`}
            showDetail="Details"
          />
        )}
      </Route>
    </>
  );
}
