import React, { useState } from "react";
import DownVote from "../ButtonComps/DownVote";
import FilterButton from "../ButtonComps/FilterButton";
import UpVote from "../ButtonComps/UpVote";
import Logo from "../Decorators/Logo";
import MainPoster from "./MainPoster";
import Filters from "../filter/Filters";
// import NotificationMatched from "./NotificationMatched";
import UpdateLikeToDB from "../../db-operations/UpdateLikeToDB";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";

import { Result } from "../../db-operations/useGetMovies";
import MovieDetails from "../movieDetails/MovieDetails";
import baseUrl from "../../HelperFunctions/ImgBaseUrl";
import backgroundStyle from "../../HelperFunctions/backgroundStyleMaker";

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
  const [showDetails, setShowDetails] = useState(false);

  const handleLike = () => {
    const movieID: number = movieList[currentIndex].id;
    UpdateLikeToDB(userId, movieID, true);
    setCurrentIndex((prev) => prev + 1);
    console.log("liked");
  };
  const handleDislike = () => {
    const movieID: number = movieList[currentIndex].id;
    UpdateLikeToDB(userId, movieID, false);
    setCurrentIndex((prev) => prev + 1);
    console.log("disliked");
  };

  if (showDetails) {
    return <MovieDetails movieID={movieList[currentIndex].id} />;
  } else
    return (
      <>
        {filterOn && <Filters setFilterOn={setFilterOn} />}
        <div className="background_container">
          <div
            className="background"
            style={backgroundStyle(
              movieList ? baseUrl + movieList[currentIndex].poster_path : ""
            )}
          />
        </div>
        <div className="content">
          <div className="container_header">
            <Logo />
            <FilterButton setFilterOn={setFilterOn} />
          </div>
          {/* <div className="loader"></div> */}
          {/* <NotificationMatched /> */}
          <div
            className="container_poster"
            onClick={() => setShowDetails(true)}
          >
            {movieList && (
              <MainPoster
                imgUrl_1={baseUrl + movieList[currentIndex].poster_path}
                imgUrl_2={baseUrl + movieList[currentIndex + 1].poster_path}
                imgUrl_3={baseUrl + movieList[currentIndex + 2].poster_path}
              />
            )}
          </div>
          <div className="container_vote">
            <DownVote handleDislike={handleDislike} />
            <div
              className={`${sharedstyle.btn} ${sharedstyle.btn_details}`}
              onClick={() => setShowDetails(true)}
            >
              Details
            </div>
            <UpVote handleLike={handleLike} />
          </div>
        </div>
      </>
    );
}