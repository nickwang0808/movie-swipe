import React from "react";
import LikedMovieInMyList from "./LikedMovieInMyList";

export default function MyListMain() {
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
