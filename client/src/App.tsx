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
  const { userAuth } = useContext(UserContext);

  const { movieList } = useGetMovies();

  if (userAuth?.isLoggedIn === false) {
    return <Redirect exact to="/auth" />;
  } else if (userAuth?.isLoggedIn) {
    return (
      <>
        <Nav />
        <Switch>
          <Route exact path="/">
            {movieList && userAuth && (
              <LikeOrNo
                movieList={movieList}
                userId={userAuth.userInfo.uid as string}
              />
            )}
          </Route>
          <Route exact path="/auth">
            {userAuth.isLoggedIn ? <Redirect exact to="/" /> : <SignInScreen />}
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
