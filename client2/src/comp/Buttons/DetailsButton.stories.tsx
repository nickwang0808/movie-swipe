import { Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import DetailsButton from "./DetailsButton";

export default {
  title: "Buttons/Middle Detail Button ",
  component: DetailsButton,
};

const template: Story<ComponentProps<typeof DetailsButton>> = (arg) => (
  <DetailsButton {...arg} />
);

export const Main = template.bind({});

Main.args = {
  MiddleButtonText: "Details",
  handleClickMiddleButton: () => console.log("Details"),
};
