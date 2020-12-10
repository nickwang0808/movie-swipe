import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import "../src/App.css";
import React from "react";
import { addDecorator } from "@storybook/react";
import { MemoryRouter } from "react-router";
import BottomNav from "../src/comp/NavBar/BottomNav";
import WindowSizingProvider from "../src/comp/Layout/WindowSizingProvider";
import { IonApp } from "@ionic/react";

addDecorator((story) => (
  <>
    <IonApp>
      <MemoryRouter initialEntries={["/"]}>
        <WindowSizingProvider>{story()}</WindowSizingProvider>
        <BottomNav />
      </MemoryRouter>
    </IonApp>
  </>
));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "fullscreen",
};
