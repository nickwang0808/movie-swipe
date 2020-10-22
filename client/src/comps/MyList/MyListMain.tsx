import React, { useEffect } from "react";
import { db } from "../../firebase/config";
import LikedMovieInMyList from "./LikedMovieInMyList";

export default function MyListMain() {
  // useEffect(() => {
  //   db;
  // }, []);

  return (
    <>
      <div>
        <h1>My Saved List</h1>
      </div>

      <div>
        <LikedMovieInMyList />
        <LikedMovieInMyList />
        <LikedMovieInMyList />
        <LikedMovieInMyList />
        <LikedMovieInMyList />
        <LikedMovieInMyList />
        <LikedMovieInMyList />
        <LikedMovieInMyList />
      </div>
    </>
  );
}
