import React, { useContext, useState } from "react";
import { Route } from "react-router";
import { UserContext } from "../../store";
import MovieDetails from "../movieDetails/MovieDetails";
import LikedMovieInMyList from "./LikedMovieInMyList";
import style from "./mylistmain.module.css";
import {motion} from "framer-motion";

export default function MyListMain() {
  const { likedMoviesInfos, matches } = useContext(UserContext);
  const [idToShowDetails, setIdToShowDetails] = useState<number>();

  return (
    <>
      <Route exact path="/mylist/detials">
        {idToShowDetails && (
          <MovieDetails
            movieID={idToShowDetails}
            goTo="/mylist"
            handleDislike={() => console.log("")} // dummy function that can't be called, bypassing ts checking
            handleLike={() => console.log("")} // dummy function that can't be called, bypassing ts checking
            showVoting={false}
            matches={
              matches?.find(
                (element) => element.matchedMovie === idToShowDetails
              )
                ? matches?.find(
                    (element) => element.matchedMovie === idToShowDetails
                  )?.friendUid
                : undefined
            }
          />
        )}
      </Route>
      <Route exact path="/mylist">
        <div className="container_allcontent">
          <div>
            <h1>My Watch List</h1>
          </div>

          <motion.div
          animate={{opacity: 1, paddingTop: "0rem"}}
          initial={{opacity: 0, paddingTop: "2rem"}}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}className={style.mylistmain}>
            {likedMoviesInfos.map((likedMovieInfo) => (
              <LikedMovieInMyList
                key={likedMovieInfo.id}
                movie={likedMovieInfo}
                setIdTPShowDetails={setIdToShowDetails}
                matched={
                  matches?.find(
                    (element) => element.matchedMovie === likedMovieInfo.id
                  )
                    ? true
                    : false
                }
              />
            ))}
          </motion.div>
        </div>
      </Route>
    </>
  );
}
