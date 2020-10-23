import React from "react";
import useGetLikedMovies from "../../db-operations/useGetLikedMovies";
import LikedMovieInMyList from "./LikedMovieInMyList";

export default function MyListMain() {
  const likedMoviesInfos = useGetLikedMovies("user1");

  return (
    <>
      <div>
        <h1>My Saved List</h1>
      </div>

      <div>
        {likedMoviesInfos &&
          likedMoviesInfos.map((likedMovieInfo) => (
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
