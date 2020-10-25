import React, { useState } from "react";
import DownVote from "../ButtonComps/DownVote";
import FilterButton from "../ButtonComps/FilterButton";
import UpVote from "../ButtonComps/UpVote";
import Logo from "../Decorators/Logo";
import MainPoster from "./MainPoster";
import Filters from "../filter/Filters";
import UpdateLikeToDB from "../../db-operations/UpdateLikeToDB";
import style from "../ButtonComps/ButtonComps.module.css";

interface ImovieInfo {
  popularity: number;
  vote_count: number;
  video: boolean;
  poster_path: string;
  id: number;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  title: string;
  vote_average: number;
  overview: string;
  release_date: Date;
}

interface ICompProps {
  movieList: ImovieInfo[];
  userId: string;
}

export default function LikeOrNo({ movieList, userId }: ICompProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterOn, setFilterOn] = useState(false);

  const handleLike = () => {
    // const movieID: string = movieList[currentIndex].id;
    // UpdateLikeToDB(userId, movieID, true);
    // setCurrentIndex((prev) => prev + 1);
    console.log("liked");
  };
  const handleDislike = () => {
    // const movieID: string = movieList[currentIndex].id;
    // UpdateLikeToDB(userId, movieID, false);
    // setCurrentIndex((prev) => prev + 1);
    console.log("disliked");
  };

  const baseUrl = "https://image.tmdb.org/t/p/w500";
  const backgroundStyle = {
    background: `linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${
      movieList && baseUrl + movieList[currentIndex].poster_path
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
          <div className={`${style.btn} ${style.btn_details}`}>Details</div>
          <UpVote handleLike={handleLike} />
        </div>
      </div>
    </>
  );
}
