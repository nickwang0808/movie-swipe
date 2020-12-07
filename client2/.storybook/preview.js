import "../src/App.css";
import React from "react";
import { addDecorator } from "@storybook/react";
import { MemoryRouter } from "react-router";
import BottomNav from "../src/comp/NavBar/BottomNav";

addDecorator((story) => (
  <>
    <MemoryRouter initialEntries={["/"]}>
      {story()}
      <BottomNav />
    </MemoryRouter>
  </>
));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "fullscreen",
};
