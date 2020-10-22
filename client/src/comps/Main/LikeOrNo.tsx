import React, { useEffect, useState } from "react";
import DownVote from "../ButtonComps/DownVote";
import FilterButton from "../ButtonComps/FilterButton";
import UpVote from "../ButtonComps/UpVote";
import Logo from "../Decorators/Logo";
import MainPoster from "./MainPoster";
import { firestore } from "firebase";
import UpdateLikeToDB from "../../db-operations/UpdateLikeToDB";

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

interface I_User {
  id: string;
  info: {
    first_name: string;
    last_name: string;
  };
  liked_movies: Array<string>;
  groups: string[];
}

interface ICompProps {
  movieList: ImovieItem[];
  user: firestore.DocumentData;
}

export default function LikeOrNo({ movieList, user }: ICompProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLike = () => {
    const movieID: string = movieList[currentIndex].id;
    if (user) {
      UpdateLikeToDB(user, movieID);
      setCurrentIndex((prev) => prev + 1);
    } else {
      console.error("Update like to db failed");
    }
  };

  const backgroundStyle = {
    background: `linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${
      movieList && movieList[currentIndex].movie.imageurl[0]
    })`,
  };
  return (
    <>
      <div className="background" style={backgroundStyle} />
      <div className="content">
        <div className="container_header">
          <Logo />
          <FilterButton />
        </div>

        <div className="container_poster">
          {movieList && (
            <MainPoster
              imgUrl_1={movieList[currentIndex].movie.imageurl[0]}
              imgUrl_2={movieList[currentIndex + 1].movie.imageurl[0]}
              imgUrl_3={movieList[currentIndex + 2].movie.imageurl[0]}
            />
          )}
        </div>

        <div className="container_vote" style={{ zIndex: 998 }}>
          <DownVote handleDislike={() => setCurrentIndex((prev) => prev + 1)} />
          <div className="btn btn_details">Details</div>
          <UpVote handleLike={handleLike} />
        </div>
      </div>
    </>
  );
}