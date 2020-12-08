import "../src/App.css";
import React from "react";
import { addDecorator } from "@storybook/react";
import { MemoryRouter } from "react-router";
import BottomNav from "../src/comp/NavBar/BottomNav";
import WindowSizingProvider from "../src/comp/Layout/WindowSizingProvider";

addDecorator((story) => (
  <>
    <MemoryRouter initialEntries={["/"]}>
      <WindowSizingProvider>{story()}</WindowSizingProvider>
      <BottomNav />
    </MemoryRouter>
  </>
));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "fullscreen",
};
