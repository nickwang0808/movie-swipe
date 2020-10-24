import React, { useContext } from "react";
import useGetLikedMovies from "../../db-operations/useGetLikedMovies";
import { UserContext } from "../../store";
import LikedMovieInMyList from "./LikedMovieInMyList";
import style from "./mylistmain.module.css";

export default function MyListMain() {
  const { userAuth } = useContext(UserContext);
  const likedMoviesInfos = useGetLikedMovies(userAuth?.userInfo.uid as string);

  return (
    <>
      <div>
        <h1>My Saved List</h1>
      </div>

      <div className={style.mylistmain}>
        {likedMoviesInfos.map((likedMovieInfo) => (
          <LikedMovieInMyList
            key={likedMovieInfo.id}
            id={likedMovieInfo.id}
            movie={likedMovieInfo.movie.movie}
          />
        ))}
      </div>

    </>
  );
}
