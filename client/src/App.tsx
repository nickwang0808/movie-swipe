import React, { useContext } from "react";
import "./styles/style.css";
import LikeOrNo from "./comps/Main/LikeOrNo";
import Nav from "./comps/Nav/Nav";
import MyListMain from "./comps/MyList/MyListMain";
import { Switch, Route, Redirect } from "react-router-dom";
import useGetMovies from "./db-operations/useGetMovies";
import SignInScreen from "./comps/auth/SignInScreen";
import { UserContext } from "./store";
import { auth } from "./firebase/config";
import style from "./App.module.css";
import ListViewButton from "./comps/ButtonComps/ListViewButton";

function App() {
  const { userAuth } = useContext(UserContext);

  const { movieList } = useGetMovies(userAuth?.userInfo?.uid as string);

  if (userAuth?.isLoggedIn === false || !userAuth) {
    return <SignInScreen />;
  } else if (userAuth?.isLoggedIn) {
    return (
      <>
        <Nav />
        <Switch>
          <Route exact path="/">
            {movieList && userAuth && (
              <LikeOrNo
                movieList={movieList.results}
                userId={userAuth?.userInfo.uid as string}
              />
            )}
          </Route>
          <Route exact path="/mylist">
            <MyListMain />
          </Route>
          <Route exact path="/profile">
            <h1>My Profile</h1>
            <div className={style.settings_container}></div>
            <ListViewButton name="Sign Out" />
            <button onClick={() => auth.signOut()}>Sign Out</button>
          </Route>
        </Switch>
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

export default App;
