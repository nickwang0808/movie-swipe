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

import React, { useContext } from "react";
import "./styles/style.css";
import LikeOrNo from "./comps/Main/LikeOrNo";
import Nav from "./comps/Nav/Nav";
import MyListMain from "./comps/MyList/MyListMain";
import { Redirect, Route } from "react-router-dom";
import SignInScreen from "./comps/auth/SignInScreen";
import { UserContext } from "./store";

import MyProfile from "./comps/profile/MyProfile";
import MovieDetails from "./comps/movieDetails/MovieDetails";
import Onboarding from "./comps/intro/onboarding";

function App() {
  const { userAuth, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <div className="loader loader_center" />;
  } else if (userAuth === null) {
    return (
      <>
        <Route path="/" render={() => <Redirect to="/onboard" />} />
        <Route path="/profile" render={() => <Redirect to="/onboard" />} />
        <Route path="/onboard">
          <Onboarding />;
        </Route>
        <Route path="/auth">
          <SignInScreen />;
        </Route>
      </>
    );
  } else {
    return (
      <>
        <Nav />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/auth" render={() => <Redirect to="/home" />} />
        <Route path="/onboard" render={() => <Redirect to="/home" />} />
        <Route path="/home">
          {userAuth && <LikeOrNo userId={userAuth?.userInfo.uid as string} />}
        </Route>
        <Route path="/mylist">
          <MyListMain />
        </Route>
        <Route path="/profile">
          <MyProfile />
        </Route>
        <Route path="/detials/:id">
          <MovieDetails MiddleButtonText="Watch List" />
        </Route>
        <Route path="/completeSignUp">
          <SignInScreen />;
        </Route>
      </>
    );
  }
}

export default App;
