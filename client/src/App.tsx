import React from "react";
import "./styles/style.css";
import LikeOrNo from "./comps/Main/LikeOrNo";
import Nav from "./comps/Nav/Nav";

function App() {
  // useEffect(() => {
  //   if (movieList) {
  //     console.log(movieList.movieList.results[currentIndex].imageurl[0]);
  //   }
  // }, [movieList]);

  return (
    <>
      <Nav />
      <LikeOrNo />
    </>
  );
}

export default App;
