import React, { useEffect, useState } from "react";
import DownVote from "../ButtonComps/DownVote";
import FilterButton from "../ButtonComps/FilterButton";
import UpVote from "../ButtonComps/UpVote";
import Logo from "../Decorators/Logo";
import useGetMovies from "../../db-operations/useGetMovies";
import useGetUser from "../../db-operations/useGetUser";
import useWatchForMatches from "../../db-operations/useWatchForMatches";
import Deck from "./Deck";

interface ImovieInfo {
  imageurl: string[];
  genre: string[];
  imdbid: string;
  synopsis: string;
  title: string;
  type: string;
  released: number;
}

interface ICompProps {
  movieInfo: ImovieInfo;
}

export default function LikeOrNo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { movieList } = useGetMovies();
  const user = useGetUser("user1");
  // const groups = useWatchForMatches(user);

  const handleLike = () => {
    // TODO: will need to rewrite this as well
    // const movieTitle: string = movieList.movieList.results[currentIndex].title;
    if (user) {
      // UpdateLikeToDB(user, movieTitle);
      setCurrentIndex((prev) => prev + 1);
    } else {
      console.error("Update like to db failed");
    }
  };

  const backgroundStyle = {
    background: `linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${
      movieList && movieList[currentIndex].imageurl[0]
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
        <div className="container_poster"></div>

        {movieList && (
          <Deck movieList={movieList} setCurrentIndex={setCurrentIndex} />
        )}

        <div className="container_vote">
          <DownVote />
          <div className="btn btn_details">Details</div>
          <UpVote handleLike={handleLike} />
        </div>
      </div>
    </>
  );
}
