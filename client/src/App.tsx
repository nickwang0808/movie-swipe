import React, { useEffect } from "react";
import "./styles/style.css";
import LikeOrNo from "./comps/Main/LikeOrNo";
import Nav from "./comps/Nav/Nav";
import MyListMain from "./comps/MyList/MyListMain";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CleanUpMovieList from "./db-operations/CleanUpMovieList";
import useGetMovies from "./db-operations/useGetMovies";
import useGetUser from "./db-operations/useGetUser";

function App() {
  // useEffect(() => {
  //   CleanUpMovieList();
  // }, []);

  const { movieList } = useGetMovies();
  const user = useGetUser("user1");

  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            {movieList && user && (
              <LikeOrNo movieList={movieList} user={user} />
            )}
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
