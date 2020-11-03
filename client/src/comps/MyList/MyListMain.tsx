import React, { useContext, useState } from "react";
import { Route } from "react-router";
import { UserContext } from "../../store";
import MovieDetails from "../movieDetails/MovieDetails";
import LikedMovieInMyList from "./LikedMovieInMyList";
import style from "./mylistmain.module.css";

export default function MyListMain() {
  const { likedMoviesInfos } = useContext(UserContext);
  const [idTPshowDetails, setIdTPShowDetails] = useState<number>();

  return (
    <>
      <Route exact path="/mylist/detials">
        {idTPshowDetails && (
          <MovieDetails
            movieID={idTPshowDetails}
            goTo="/mylist"
            handleDislike={() => console.log("")} // dummy function that can't be called, bypassing ts checking
            handleLike={() => console.log("")} // dummy function that can't be called, bypassing ts checking
            showVoting={false}
          />
        )}
      </Route>
      <Route exact path="/mylist">
      <div className="container_allcontent">
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
      </Route>
    </>
  );
}
