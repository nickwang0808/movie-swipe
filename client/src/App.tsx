import React, { useContext, useEffect, useState } from "react";
import "./styles/style.css";
import LikeOrNo from "./comps/Main/LikeOrNo";
import Nav from "./comps/Nav/Nav";
import MyListMain from "./comps/MyList/MyListMain";
import { Switch, Route, Redirect } from "react-router-dom";
import useGetMovies from "./db-operations/useGetMovies";
import useGetUser from "./db-operations/useGetUser";
import SignInScreen from "./comps/auth/SignInScreen";
import { UserContext } from "./store";

function App() {
  const user = useContext(UserContext);

  const { movieList } = useGetMovies();

  if (user?.isLoggedIn === false) {
    return <Redirect exact to="/auth" />;
  } else if (user?.isLoggedIn) {
    return (
      <>
        <Nav />
        <Switch>
          <Route exact path="/">
            {movieList && user && (
              <LikeOrNo movieList={movieList} user={user} />
            )}
          </Route>
          <Route exact path="/auth">
            {user.isLoggedIn ? <Redirect exact to="/" /> : <SignInScreen />}
          </Route>
          <Route exact path="/mylist">
            <MyListMain />
          </Route>
          <Route exact path="/settings">
            <h1>Setting page</h1>
          </Route>
        </Switch>
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

export default App;
