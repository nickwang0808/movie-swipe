import React, { useContext, useEffect } from "react";
import { Route } from "react-router";
import { UserContext } from "../../store";
import LikedMovieInMyList from "./LikedMovieInMyList";
import style from "./mylistmain.module.css";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { updateOldMatchCounts } from "../../db-operations/useGetWatchListNotification";

export default function MyListMain() {
  const { likedMoviesInfos, watchedMovieInfos, matches, userAuth } = useContext(
    UserContext
  );

  useEffect(() => {
    if (likedMoviesInfos && userAuth) {
      console.log("update old match count");
      updateOldMatchCounts(userAuth.userInfo.uid, likedMoviesInfos.length);
    }
  }, [likedMoviesInfos, userAuth]);

  return (
    <>
      <Route path="/mylist">
        <div className="container_allcontent">
          <div>
            <h1>My Watch List</h1>
          </div>
          <div className={style.container_tabs}>
            <NavLink
              exact
              to="/mylist"
              className={`${style.tab} ${"heavy link"}`}
              activeClassName={style.tab_active_1}
            >
              My Movies
            </NavLink>
            <NavLink
              exact
              to="/mylist/watched"
              className={`${style.tab} ${"heavy link"}`}
              activeClassName={style.tab_active_1}
            >
              History
            </NavLink>
          </div>
          <motion.div
            animate={{ opacity: 1, paddingTop: "0rem" }}
            initial={{ opacity: 0, paddingTop: "2rem" }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={style.mylistmain}
          >
            <Route exact path="/mylist">
              {likedMoviesInfos.map((likedMovieInfo) => (
                <LikedMovieInMyList
                  key={likedMovieInfo.id}
                  movie={likedMovieInfo}
                  matched={
                    matches?.find(
                      (element) => element.matchedMovie === likedMovieInfo.id
                    )
                      ? true
                      : false
                  }
                />
              ))}
            </Route>
            <Route exact path="/mylist/watched">
              {watchedMovieInfos.map((watchedMovieInfo) => (
                <LikedMovieInMyList
                  key={watchedMovieInfo.movieDetails.id}
                  movie={watchedMovieInfo.movieDetails}
                  watched={
                    watchedMovieInfo.watchedWith.length > 0
                      ? watchedMovieInfo.watchedWith
                      : undefined
                  }
                />
              ))}
            </Route>
          </motion.div>
        </div>
      </Route>
    </>
  );
}
