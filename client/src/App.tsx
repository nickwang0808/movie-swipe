import { Box, IconButton } from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Frame from "./comps/frame/Frame";
import "./devices.min.css";
import useGetMovies from "./db-operations/useGetMovies";
import useGetUser from "./db-operations/useGetUser";
import useWatchForMatches from "./db-operations/useWatchForMatches";
import { UpdateLikeToDB } from "./db-operations/UpdateLikeToDB";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { movieList } = useGetMovies();
  const user = useGetUser("user1");
  const groups = useWatchForMatches(user);

  const handleLike = () => {
    const movieTitle: string = movieList.movieList.results[currentIndex].title;
    if (user) {
      UpdateLikeToDB(user, movieTitle);
      setCurrentIndex((prev) => prev + 1);
    } else {
      console.error("Update like to db failed");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Frame>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Box>
            <img
              width="300px"
              src={
                movieList
                  ? movieList.movieList.results[currentIndex].imageurl[0]
                  : ""
              }
              alt="img for movie "
            />
          </Box>
          <Box display="flex" justifyContent="space-between" width="40%">
            <IconButton onClick={() => setCurrentIndex((prev) => prev + 1)}>
              <Close />
            </IconButton>
            <IconButton onClick={handleLike}>
              <Check />
            </IconButton>
          </Box>
        </Box>
      </Frame>
    </Box>
  );
}

export default App;
