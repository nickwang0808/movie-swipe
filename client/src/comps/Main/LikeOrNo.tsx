import React, { useEffect, useState } from "react";
import FilterButton from "../ButtonComps/FilterButton";
import Logo from "../Decorators/Logo";
import MainPoster from "./MainPoster/MainPoster";
import Filters from "../filter/Filters";
// import NotificationMatched from "./NotificationMatched";
import UpdateLikeToDB from "../../db-operations/UpdateLikeToDB";
import { Result } from "../../db-operations/useGetMovies";
import MovieDetails from "../movieDetails/MovieDetails";
import baseUrl from "../../HelperFunctions/ImgBaseUrl";
import backgroundStyle from "../../HelperFunctions/backgroundStyleMaker";
import VotingActions from "./VotingActions";
import { AnimatePresence, motion } from "framer-motion";
import Deck from "./Deck/Deck";

interface ICompProps {
  movieList: Result[];
  userId: string;
  setCurrentIndex: (arg: (arg: number) => number) => void;
  currentIndex: number;
}

export default function LikeOrNo({
  movieList,
  userId,
  currentIndex,
  setCurrentIndex,
}: ICompProps) {
  const [filterOn, setFilterOn] = useState(false);
  const [showDetails, setShowDetails] = useState<boolean | undefined>(false);
  const [voteType, setVoteType] = useState<"like" | "dislike">();
  const [movieListInDeck, setMovieListInDeck] = useState(movieList.slice(0, 4));
  const [isLike, setIsLike] = useState<boolean>();

  const handleNext = () => {
    let movieListInDeckCopy = [...movieListInDeck];
    movieListInDeckCopy.shift();
    movieListInDeckCopy.push(movieList[currentIndex + 4]);
    setMovieListInDeck(movieListInDeckCopy);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleLike = (movieID: number) => {
    // UpdateLikeToDB(userId, movieID, true);
    handleNext();
    setShowDetails(false);
    setVoteType("like");
  };
  const handleDislike = (movieID: number) => {
    // UpdateLikeToDB(userId, movieID, false);
    handleNext();
    setShowDetails(false);
    setVoteType("dislike");
  };

  useEffect(() => {
    if (isLike === true) {
      handleLike(movieListInDeck[0].id);
    }
    if (isLike === false) {
      handleDislike(movieListInDeck[0].id);
    }
  }, [isLike]);

  if (showDetails) {
    return (
      <MovieDetails
        movieID={movieList[currentIndex].id}
        setShowDetails={setShowDetails}
        handleDislike={handleDislike}
        handleLike={handleLike}
        showVoting={true}
      />
    );
  } else
    return (
      <>
        <AnimatePresence>
          {filterOn && <Filters setFilterOn={setFilterOn} />}
        </AnimatePresence>
        <div className="background_container">
          <div
            className="background"
            style={backgroundStyle(
              movieList ? baseUrl + movieList[currentIndex].poster_path : ""
            )}
          />
        </div>
        <div className="container_header">
          <Logo />
          <FilterButton setFilterOn={setFilterOn} />
        </div>
        {/* <div className="loader"></div> */}
        {/* <NotificationMatched /> */}
        {/* <div className="container_poster" onClick={() => setShowDetails(true)}> */}
        <Deck
          movieListInDeck={movieListInDeck}
          handleLike={handleLike}
          handleDislike={handleDislike}
          setIsLike={setIsLike}
          isLike={isLike}
        />
        {/* </div> */}
        <VotingActions
          handleDislike={() => {
            if (isLike === false) {
              handleDislike(movieListInDeck[0].id);
            }
            setIsLike(false);
          }}
          handleLike={() => {
            if (isLike === true) {
              handleLike(movieListInDeck[0].id);
            }
            setIsLike(true);
          }}
          setShowDetails={() => setShowDetails(true)}
          showDetail="Details"
        />
      </>
    );
}
