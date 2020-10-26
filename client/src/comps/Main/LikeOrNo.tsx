import React, { useRef, useState } from "react";
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
import MovieDetails from "./movieDetails/MovieDetails";

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

  const scrollTargetRef = useRef<any>(null);
  const handleDetails = () => {
    window.scrollTo(0, scrollTargetRef.current?.offsetTop);
    // console.log("handleDetails -> scrollTargetRef", scrollTargetRef);
  };

  const baseUrl = "https://image.tmdb.org/t/p/w500";
  const backgroundStyle = {
    background: `linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${
      movieList ? baseUrl + movieList[currentIndex].poster_path : ""
    })`,
  };

  return (
    <>
      {filterOn && <Filters setFilterOn={setFilterOn} />}
      <div className="background_container">
        <div className="background" style={backgroundStyle} />
      </div>
      <div className="content">
        <div className="container_header">
          <Logo />
          <FilterButton setFilterOn={setFilterOn} />
        </div>
        {/* <div className="loader"></div> */}
        {/* <NotificationMatched /> */}
        <div className="container_poster">
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
          <div className={`${sharedstyle.btn} ${sharedstyle.btn_details}`}>Details</div>
          <UpVote handleLike={handleLike} />
        </div>
        <MovieDetails />
        <div ref={scrollTargetRef} /> {/* dummy target div, dont remove it */}
      </div>
    </>
  );
}
