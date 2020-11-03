import React, { useContext } from "react";
import style from "./MyProfile.module.css";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import BackButton from "../ButtonComps/BackButton";
import DislikedMovieInMyList from "./DislikedMovieInMyList";


export default function DislikedMovies() {

  return (
    <div className={style.container_friendsscreen}>
      <div className={style.container_header}>
        <h1>
          <BackButton linkTo="/profile" />
          Disliked Movies
        </h1>
      </div>
      <div className={style.mylistmain}>
        {/* <DislikedMovieInMyList /> */}
        <h2> Workin' on it! </h2>
      </div>
    </div>
  );
}
