import { IonApp, IonRouterOutlet } from "@ionic/react";
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
import "./App.css";
import AuthChecker from "./Screens/Auth/AuthChecker";
import MainScreen from "./Screens/MainScreen/MainScreen";

const App: React.FC = () => {
  return (
    <AuthChecker>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <MainScreen />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AuthChecker>
  );
};

export default App;
