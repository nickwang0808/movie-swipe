import React, { useEffect, useState } from "react";
import getGenres from "../../HelperFunctions/getGenres";
import style from "./MovieDetails.module.css";
import searchMovieByID from "../../APICalls/searchMovieByID";
import { MovieDetail } from "../../db-operations/useGetLikedMovies";
import baseUrl from "../../HelperFunctions/ImgBaseUrl";
import posterStyleMaker from "../../HelperFunctions/posterStyleMaker";
import getMovieTrailers from "../../APICalls/getMovieTrailers";
import StreamingServiceButton from "../ButtonComps/StreamingService";

interface IMovieDetails {
  movieID: number;
}

export default function MovieDetails({ movieID }: IMovieDetails) {
  const [movieDetails, setMovieDetails] = useState<MovieDetail>();
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    (async () => {
      const movieDetails = await searchMovieByID(movieID);
      setMovieDetails(movieDetails);
      const trailerUrl = await getMovieTrailers(movieID);
      setTrailerUrl(trailerUrl);
    })();
  }, []);

  return (
    <div className={style.details_content}>
      <div className={style.details_trailer}>
        <iframe src={trailerUrl} />
      </div>
      <div className={style.container_moviedetails}>
        <div
          className={style.poster_1_inline}
          style={posterStyleMaker(baseUrl + movieDetails?.poster_path)}
        />
        <div className={style.details_title}>
          <h1>{movieDetails?.title}</h1>
        </div>
        <div className={style.details_rating}>
          <h3 className="heavy">{movieDetails?.vote_average}</h3>
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
          {/* <img src="logo_imdb.png" height="16px" /> */}
        </div>
        <div className={style.details_tags}>
          <h3> {`${movieDetails && getGenres(movieDetails)}`}</h3>
          <h3 className={style.poster_overview_details}>
            {`PG-13 | ${movieDetails?.runtime}min | ${movieDetails?.release_date}`}
          </h3>
        </div>
      </div>
      <div className={style.container_info}>
        <div className={style.container_watch}></div>
        <div className={style.container_description}>
          <p>{movieDetails?.overview}</p>
        </div>
        <div className={style.container_available}>
          Available on
          <div className={style.available_icons}>
            < StreamingServiceButton />
          </div>
        </div>
      </div>
    </div>
  );
}
