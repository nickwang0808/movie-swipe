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
        handleDislike={() => console.log("")} // dummy function that can't be called, bypassing ts checking
        handleLike={() => console.log("")} // dummy function that can't be called, bypassing ts checking
        showVoting={false}
      />
    );
  } else {
    return (
      <div className={style.container_mylist}>
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
      </div>
    );
  }
}
