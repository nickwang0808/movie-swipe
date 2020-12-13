import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import MainScreen from "./MainScreen";

export default {
  title: "Screen/MainScreen",
  component: MainScreen,
} as Meta;

const Template = () => <MainScreen />;

export const Default = Template.bind({});
