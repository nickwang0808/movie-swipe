import React from "react";
import "./styles/style.css";
import LikeOrNo from "./comps/Main/LikeOrNo";
import Nav from "./comps/Nav/Nav";
import MyListMain from "./comps/MyList/MyListMain";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <LikeOrNo />
          </Route>
          <Route exact path="/mylist">
            <MyListMain />
          </Route>
          <Route exact path="/settings">
            <h1>Setting page</h1>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
