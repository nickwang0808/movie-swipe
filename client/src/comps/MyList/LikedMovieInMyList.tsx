import { link } from "fs";
import React from "react";
import { Link } from "react-router-dom";
import { MovieDetail } from "../../APICalls/searchMovieByID";
import getGenres from "../../HelperFunctions/getGenres";
import getMovieCertificate from "../../HelperFunctions/getMovieCertificate";
import style from "./LikedMovieInMylist.module.css";

interface ILikedMovieInMyList {
  movie: MovieDetail;
  setIdTPShowDetails: (arg: number) => void;
}

export default function LikedMovieInMyList({
  movie,
  setIdTPShowDetails,
}: ILikedMovieInMyList) {
  return (
    <>
      <Link
        className={`link ${style.flex_row}`}
        onClick={() => setIdTPShowDetails(movie.id)}
        to="/mylist/detials"
      >
        <img
          className={style.poster}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="img"
        />
        <div className="details_rating">
          {/* <div className={style.matched}>
            <div className={style.forceSkew}>
              {matched && <div>MATCHED!</div>}
            </div>
          </div> */}
          <div className={style.details_likedtitle}>
            <h2>{movie.title}</h2>
          </div>
          <div className={style.flex_row_rating}>
            <h3 className="heavy">{movie.vote_average}</h3>
            <div className="star">
              <svg
                width="15"
                height="14"
                viewBox="0 0 15 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.5709 5.28981C14.4747 4.99399 14.2123 4.78455 13.9031 4.75658L9.68593 4.37371L8.01926 0.471701C7.89621 0.185024 7.61622 0 7.30457 0C6.99293 0 6.71283 0.185024 6.59056 0.471701L4.92389 4.37371L0.706 4.75658C0.396808 4.78511 0.134988 4.99455 0.0382398 5.28981C-0.0579506 5.58562 0.0308834 5.91008 0.264728 6.11517L3.45261 8.91049L2.51266 13.0504C2.44389 13.3548 2.56204 13.6695 2.81461 13.8521C2.95037 13.9507 3.10987 14 3.26993 14C3.40747 14 3.54512 13.9634 3.66806 13.8899L7.30457 11.7155L10.9404 13.8899C11.2071 14.0493 11.5425 14.0347 11.7945 13.8521C12.0471 13.6695 12.1653 13.3548 12.0965 13.0504L11.1565 8.91049L14.3444 6.11517C14.5782 5.91008 14.6671 5.58629 14.5709 5.28981Z" />
              </svg>
            </div>
          </div>
          <div className={style.details_tags}>
            <h3>{getGenres(movie)}</h3>
            <h3>{`${getMovieCertificate(movie)} | ${
              movie.runtime
            }min | ${movie.release_date.toString().slice(0, 4)}`}</h3>
          </div>
        </div>
      </Link>
    </>
  );
}
