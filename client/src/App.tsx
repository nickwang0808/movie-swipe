import { Box, IconButton } from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Frame from "./comps/frame/Frame";
import "./devices.min.css";
import { db } from "./firebase/config";

function App() {
  const [movieList, setMovieList] = useState<any>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    db.collection("test-list")
      .doc("list-doc")
      .get()
      .then((doc) => {
        if (doc.exists) {
          setMovieList(doc.data());
        } else {
          console.log("document does not exist");
        }
      });
  }, []);

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
            <IconButton onClick={() => setCurrentIndex((prev) => prev + 1)}>
              <Check />
            </IconButton>
          </Box>
        </Box>
      </Frame>
    </Box>
  );
}

export default App;
