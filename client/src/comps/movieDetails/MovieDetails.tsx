import React, { useEffect, useState } from "react";
import getGenres from "../../HelperFunctions/getGenres";
import searchMovieByID from "../../APICalls/searchMovieByID";
import { MovieDetail } from "../../db-operations/useGetLikedMovies";
import baseUrl from "../../HelperFunctions/ImgBaseUrl";
import posterStyleMaker from "../../HelperFunctions/posterStyleMaker";
import getMovieTrailers from "../../APICalls/getMovieTrailers";
import StreamingServiceButton from "../ButtonComps/StreamingService";
import style from "./MovieDetails.module.css";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import VotingActions from "../Main/VotingActions";
import backgroundStyle from "../../HelperFunctions/backgroundStyleMaker";

interface IMovieDetails {
  movieID: number;
  setShowDetails: (arg: undefined) => void;
  showVoting: boolean;
  handleDislike: () => void;
  handleLike: () => void;
}

export default function MovieDetails({
  movieID,
  setShowDetails,
  handleDislike,
  handleLike,
  showVoting,
}: IMovieDetails) {
  const [movieDetails, setMovieDetails] = useState<MovieDetail>();
  const [trailerUrl, setTrailerUrl] = useState<string | null>();
  useEffect(() => {
    (async () => {
      const movieDetails = await searchMovieByID(movieID);
      setMovieDetails(movieDetails);
      const trailerUrl = await getMovieTrailers(movieID);
      setTrailerUrl(trailerUrl);
    })();
  }, []);

  const trailerDisplay = (
    <>
      {trailerUrl === null ? (
        <div
          style={{
            backgroundImage: `url(${baseUrl + movieDetails?.backdrop_path})`,
          }}
        />
      ) : (
        <iframe
          allowFullScreen={true}
          src={trailerUrl ? trailerUrl : movieDetails?.backdrop_path}
        />
      )}
    </>
  );

  return (
    <div className={style.details_content}>
      <div className="background_container">
        <div
          className="background"
          style={backgroundStyle(baseUrl + movieDetails?.poster_path)}
        />
      </div>
      <div className={style.details_trailer}>
        {trailerUrl === undefined ? <div className="loader" /> : trailerDisplay}
        {/* <div className="loader" />  */} {/* use this for testing  */}
      </div>
      <div className={style.container_moviedetails}>
        <div
          className={style.poster_1_inline}
          style={posterStyleMaker(baseUrl + movieDetails?.poster_path)}
          onClick={() => setShowDetails(undefined)}
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
            {`PG-13 | ${
              movieDetails?.runtime
            }min | ${movieDetails?.release_date.toString().slice(0, 4)}`}
          </h3>
        </div>
      </div>
      <div className={style.container_info}>
        <div className={style.container_watch}></div>
        <div className={style.container_description}>
          <div className={style.container_details_matched}>
            <div className={style.who_matched}>
              <div className={style.matched}>
                <div className={style.forceSkew}>MATCH!</div>
              </div>
              <div>You</div>
              <div className={style.matched_thumb}>
                <svg
                  width="84"
                  height="21"
                  viewBox="0 0 84 21"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M31 7.5002V19.5002C31 20.3286 31.6715 21.0002 32.5 21.0002H37V6.0002H32.5C31.6715 6.0002 31 6.67174 31 7.5002Z" />
                  <path d="M52.2299 7.4999H47.7988C47.4113 7.4999 47.2172 7.24136 47.1521 7.13003C47.0869 7.01943 46.955 6.72427 47.1425 6.38589L48.7048 3.57265C49.0476 2.95668 49.0827 2.23232 48.8022 1.58558C48.5217 0.938122 47.968 0.468639 47.2831 0.297985L46.1816 0.0225937C45.9135 -0.0447891 45.6293 0.0409044 45.4426 0.24818L39.4616 6.89272C38.8412 7.58339 38.4999 8.47402 38.4999 9.40126V17.2499C38.4999 19.3175 40.1823 20.9999 42.2499 20.9999L49.7111 20.9992C51.3957 20.9992 52.8833 19.8646 53.3278 18.2409L54.9289 10.8932C54.9758 10.6888 54.9999 10.4794 54.9999 10.2699C54.9999 8.7428 53.757 7.49988 52.2299 7.49988L52.2299 7.4999Z" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.5 13L19.5 13L19.5 15L0.5 15L0.5 13Z"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M64.5 13L83.5 13L83.5 15L64.5 15L64.5 13Z"
                  />
                </svg>
              </div>
              <div>Partner</div>
            </div>
            <div className={`${sharedstyle.btn} ${sharedstyle.btn_outline}`}>
              We've watched this!
            </div>
          </div>

          <p>{movieDetails?.overview}</p>
        </div>
        <div className={style.container_available}>
          Available on
          <div className={style.available_icons}>
            <StreamingServiceButton />
          </div>
        </div>
      </div>
      {showVoting && (
        <VotingActions
          handleDislike={handleDislike}
          handleLike={handleLike}
          setShowDetails={() => setShowDetails(undefined)}
          showDetail="Back"
        />
      )}
    </div>
  );
}
