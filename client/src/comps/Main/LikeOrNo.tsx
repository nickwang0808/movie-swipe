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
  imageurl: string[];
  genre: string[];
  imdbid: string;
  synopsis: string;
  title: string;
  type: string;
  released: number;
}

interface ImovieItem {
  id: string;
  movie: ImovieInfo;
}

interface ICompProps {
  movieList: ImovieItem[];
  userId: string;
}

export default function LikeOrNo({ movieList, userId }: ICompProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterOn, setFilterOn] = useState(false);

  const handleLike = () => {
    const movieID: string = movieList[currentIndex].id;
    UpdateLikeToDB(userId, movieID, true);
    setCurrentIndex((prev) => prev + 1);
  };
  const handleDislike = () => {
    const movieID: string = movieList[currentIndex].id;
    UpdateLikeToDB(userId, movieID, false);
    setCurrentIndex((prev) => prev + 1);
  };

  const backgroundStyle = {
    background: `linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${
      movieList && movieList[currentIndex].movie.imageurl[0]
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
              imgUrl_1={movieList[currentIndex].movie.imageurl[0]}
              imgUrl_2={movieList[currentIndex + 1].movie.imageurl[0]}
              imgUrl_3={movieList[currentIndex + 2].movie.imageurl[0]}
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
