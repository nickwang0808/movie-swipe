import { Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import ThumbVoteButton from "./ThumbVoteButton";

export default {
  title: "Buttons/ThumbVoteButton",
  component: ThumbVoteButton,
};

const template: Story<ComponentProps<typeof ThumbVoteButton>> = (arg) => (
  <ThumbVoteButton {...arg} />
);

export const Main = template.bind({});

Main.args = {
  isThumbUp: true,
  forceActive: false,
  disabled: false,
  onClick: () => console.log("Clicked"),
};

export const Disable = template.bind({});

Disable.args = {
  isThumbUp: false,
  forceActive: false,
  disabled: true,
  onClick: () => console.log("Clicked"),
};
