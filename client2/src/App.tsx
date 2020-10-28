/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */

import React, { useContext } from "react";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import "./styles/style.css";
import LikeOrNo from "./comps/Main/LikeOrNo";
import Nav from "./comps/Nav/Nav";
import MyListMain from "./comps/MyList/MyListMain";
import { Route } from "react-router-dom";
import useGetMovies from "./db-operations/useGetMovies";
import SignInScreen from "./comps/auth/SignInScreen";
import { UserContext } from "./store";

import MyProfile from "./comps/profile/MyProfile";

function App() {
  const { userAuth } = useContext(UserContext);
  const { movieList, currentIndex, setCurrentIndex } = useGetMovies(
    userAuth?.userInfo?.uid as string
  );

  if (userAuth?.isLoggedIn === false || !userAuth) {
    return <SignInScreen />;
  } else if (userAuth?.isLoggedIn) {
    return (
      <IonApp>
        <IonReactRouter>
          <Nav />
          <IonRouterOutlet>
            <Route exact path="/">
              {movieList && userAuth && (
                <LikeOrNo
                  movieList={movieList}
                  userId={userAuth?.userInfo.uid as string}
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                />
              )}
            </Route>
            <Route exact path="/mylist">
              <MyListMain />
            </Route>
            <Route exact path="/profile">
              <MyProfile />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

export default App;
