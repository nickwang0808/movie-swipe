import React, { useContext, useState } from "react";
import { UserContext } from "../../store";
import MovieDetails from "../movieDetails/MovieDetails";
import LikedMovieInMyList from "./LikedMovieInMyList";
import style from "./mylistmain.module.css";

export default function MyListMain() {
  const { likedMoviesInfos } = useContext(UserContext);
  const [idTPshowDetails, setIdTPShowDetails] = useState<number>();

  if (idTPshowDetails) {
    return (
      <MovieDetails
        movieID={idTPshowDetails}
        setShowDetails={setIdTPShowDetails}
      />
    );
  } else {
    return (
      <>
        <div>
          <h1>My Watch List</h1>
        </div>

        <div className={style.mylistmain}>
          {likedMoviesInfos.map((likedMovieInfo) => (
            <LikedMovieInMyList
              key={likedMovieInfo.id}
              movie={likedMovieInfo}
              setIdTPShowDetails={setIdTPShowDetails}
            />
          ))}
        </div>
      </>
    );
  }
}