import React from "react";
import style from "./MyProfile.module.css";
import BackButton from "../ButtonComps/BackButton";

export default function DislikedMovies() {
  return (
    <div className="container_allcontent">
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
