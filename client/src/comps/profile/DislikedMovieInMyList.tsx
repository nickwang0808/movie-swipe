import { link } from "fs";
import React from "react";
import { Link } from "react-router-dom";
import { MovieDetail } from "../../APICalls/searchMovieByID";
import getMovieCertificate from "../../HelperFunctions/getMovieCertificate";
import style from "./DislikedMovie.module.css";

export default function DislikedMovieInMyList() {
  return (
      <div className={`link ${style.flex_row}`}>
        <img
          className={style.poster}
          // src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="img"
        />
        <div className="details_rating">
          <div className={style.details_likedtitle}>
            {/* <h2>{movie.title}</h2> */}
            <h2> Movie Title </h2>
          </div>
        </div>
      </div>
  );
}
