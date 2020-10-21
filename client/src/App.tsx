import React from "react";
import "./styles/style.css";
import LikeOrNo from "./comps/Main/LikeOrNo";
import Nav from "./comps/Nav/Nav";
import MyListMain from "./comps/MyList/MyListMain";

function App() {
  return (
    <>
      <Nav />
      {/* <LikeOrNo /> */}
      <MyListMain />
    </>
  );
}

export default App;
