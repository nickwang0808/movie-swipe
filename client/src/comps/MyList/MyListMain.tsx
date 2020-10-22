import React, { useEffect } from "react";
import useGetLikedMovies from "../../db-operations/useGetLikedMovies";
import LikedMovieInMyList from "./LikedMovieInMyList";

export default function MyListMain() {
  const likedMoviesInfos = useGetLikedMovies("user1");

  // useEffect(() => {
  //   if (likedMoviesInfos) {
  //     console.log(
  //       "MyListMain, likedMovieInfos.length: ",
  //       likedMoviesInfos.length
  //     );
  //   }
  // }, [likedMoviesInfos]);

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
