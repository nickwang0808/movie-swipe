import { Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import DetailsButton from "./DetailsButton";

export default {
  title: "Middle Detail Button ",
  component: DetailsButton,
  parameters: {
    backgrounds: {
      values: [
        { name: "red", value: "#f00" },
        { name: "green", value: "#0f0" },
        { name: "blue", value: "#00f" },
      ],
    },
  },
};

const template: Story<ComponentProps<typeof DetailsButton>> = (arg) => (
  <DetailsButton {...arg} />
);

export const Main = template.bind({});

Main.args = {
  MiddleButtonText: "Details",
  handleClickMiddleButton: () => console.log("Details"),
};
