import { IonApp, IonContent, IonPage, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import React from "react";
import { Redirect, Route } from "react-router";
import "./App.css";
import BottomNav from "./comp/NavBar/BottomNav";
import useFriendsListener from "./firebase/FirestoreListeners/useFriendsListener";
import useProfileListener from "./firebase/FirestoreListeners/useProfileListener";
import useVotedMovieListener from "./firebase/FirestoreListeners/useVotedListener";
import useGetWIndowsSizing from "./Helper/useGetWIndowsSizing";
import MainScreen from "./Screens/MainScreen/MainScreen";
import MovieDetailsScreen from "./Screens/MovieDetailsScreen/MovieDetailsScreen";
import FriendsScreen from "./Screens/Profile/FriendsScreen";
import ProfileMainScreen from "./Screens/Profile/ProfileMainScreen";
import WatchList from "./Screens/WatchList/WatchList";

const App: React.FC = () => {
  useGetWIndowsSizing();
  useProfileListener();
  useVotedMovieListener();
  useFriendsListener();

  return (
    <IonApp>
      <IonReactRouter>
        <BottomNav profileBadgeCounter={0} watchListBadgeCounter={0} />
        <IonRouterOutlet>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home">
            <IonPage>
              <IonContent>
                <MainScreen />
              </IonContent>
            </IonPage>
          </Route>
          <Route exact path="/mylist">
            <IonPage>
              <WatchList />
            </IonPage>
          </Route>
          <Route exact path="/profile">
            <ProfileMainScreen />
          </Route>
          <Route exact path="/profile/friend">
            <FriendsScreen />
          </Route>
          <Route path="/details/:id">
            <MovieDetailsScreen />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
