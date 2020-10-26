import React, { useContext } from "react";
import { UserContext } from "../../store";
import LikedMovieInMyList from "./LikedMovieInMyList";
import style from "./mylistmain.module.css";

export default function MyListMain() {
  const { likedMoviesInfos } = useContext(UserContext);

  return (
    <>
      <div>
        <h1>My Watch List</h1>
      </div>

      <div className={style.mylistmain}>
        {likedMoviesInfos.map((likedMovieInfo) => (
          <LikedMovieInMyList
            key={likedMovieInfo.id}
            id={likedMovieInfo.id}
            movie={likedMovieInfo}
          />
        ))}
      </div>
    </>
  );
}
