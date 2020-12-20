import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import OnBoardDeck from "./OnBoardDeck";

export default {
  title: "OnBoardDeck",
  component: OnBoardDeck,
} as Meta;

const Template = () => <OnBoardDeck />;

export const Default = Template.bind({});
