import React, { useEffect, useState } from "react";
import "./styles/style.css";
import useGetMovies from "./db-operations/useGetMovies";
import useGetUser from "./db-operations/useGetUser";
import useWatchForMatches from "./db-operations/useWatchForMatches";
import { UpdateLikeToDB } from "./db-operations/UpdateLikeToDB";
import LikeOrNo from "./comps/Main/LikeOrNo";
import Nav from "./comps/Nav/Nav";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { movieList } = useGetMovies();
  const user = useGetUser("user1");
  const groups = useWatchForMatches(user);

  const handleLike = () => {
    const movieTitle: string = movieList.movieList.results[currentIndex].title;
    if (user) {
      // UpdateLikeToDB(user, movieTitle);
      setCurrentIndex((prev) => prev + 1);
    } else {
      console.error("Update like to db failed");
    }
  };

  // useEffect(() => {
  //   if (movieList) {
  //     console.log(movieList.movieList.results[currentIndex].imageurl[0]);
  //   }
  // }, [movieList]);

  return (
    <>
      <Nav />
      <LikeOrNo
        movieInfo={movieList?.movieList.results[currentIndex]}
        handleLike={handleLike}
      />
    </>
  );
}

export default App;
