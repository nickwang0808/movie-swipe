import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Store from "./store";

ReactDOM.render(
  <Store>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <App />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </Store>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
