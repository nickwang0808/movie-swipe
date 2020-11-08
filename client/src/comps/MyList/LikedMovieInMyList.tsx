import { link } from "fs";
import React from "react";
import { Link } from "react-router-dom";
import { MovieDetail } from "../../APICalls/searchMovieByID";
import getGenres from "../../HelperFunctions/getGenres";
import getMovieCertificate from "../../HelperFunctions/getMovieCertificate";
import style from "./LikedMovieInMylist.module.css";
import { motion } from "framer-motion";

interface ILikedMovieInMyList {
  movie: MovieDetail;
  setIdTPShowDetails: (arg: number) => void;
  matched: boolean;
}

export default function LikedMovieInMyList({
  movie,
  setIdTPShowDetails,
  matched,
}: ILikedMovieInMyList) {
  return (
    <>
      <Link
        className={`link ${style.flex_row}`}
        onClick={() => setIdTPShowDetails(movie.id)}
        to="/mylist/detials"
      >
        {/* <motion.div 
        animate={{left: "110%"}}
        transition={{
          delay: 0.25,
          duration: 1.5,
          ease: [0.85, 0, 0.15, 1],
        }}
        className={style.newmatch_anim}>
        </motion.div> */}
        <img
          className={style.poster}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="img"
        />
        <div className={style.details_rating}>
          {matched && (
            <div className={style.matched_watchlist}>
              <div className={style.forceSkew}>
                <div>MATCHED!</div>
              </div>
            </div>
          )}

          <div className={style.details_likedtitle}>
            <h2>{movie.title}</h2>
          </div>
          {/* <div className={style.watched_watchlist}>
            <svg width="22" height="14" viewBox="0 0 22 14" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.667 6.55424C18.9324 2.32783 15.2464 0 11.2988 0C7.35127 0 3.66518 2.32783 0.930612 6.55424C0.75488 6.82665 0.75488 7.17335 0.930612 7.44575C3.66518 11.6722 7.35127 14 11.2988 14C15.2464 14 18.9282 11.6722 21.667 7.44575C21.8427 7.17335 21.8427 6.82665 21.667 6.55424Z" fill="black"/>
              <path d="M10.9073 4.51298C9.60192 4.51298 8.53706 5.62736 8.53706 7.00001C8.53706 8.36911 9.59838 9.48703 10.9073 9.48703C12.2128 9.48703 13.2776 8.37265 13.2776 7.00001C13.2776 5.6309 12.2128 4.51298 10.9073 4.51298Z" fill="#11EE9E"/>
              <path d="M10.9073 10.9304C8.80593 10.9304 7.09367 9.16863 7.09367 7C7.09367 4.83137 8.80593 3.06958 10.9073 3.06958C13.0088 3.06958 14.721 4.83137 14.721 7C14.721 9.16863 13.0088 10.9304 10.9073 10.9304ZM19.6208 6.61792C17.3637 2.99528 14.3213 1 11.063 1C7.80475 1 4.7623 2.99528 2.50522 6.61792C2.36018 6.85141 2.36018 7.14858 2.50522 7.38207C4.7623 11.0047 7.80475 13 11.063 13C14.3213 13 17.3602 11.0047 19.6208 7.38207C19.7658 7.14858 19.7658 6.85141 19.6208 6.61792Z" fill="#11EE9E"/>
            </svg>
            <p>Watched with Email@Email.com</p>
          </div> */}
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
