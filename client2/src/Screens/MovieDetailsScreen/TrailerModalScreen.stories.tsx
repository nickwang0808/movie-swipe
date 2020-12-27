import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import TrailerModalScreen from "./TrailerModalScreen";

export default {
  title: "TrailerModalScreen",
  component: TrailerModalScreen,
} as Meta;

const Template = () => <TrailerModalScreen />;

export const Default = Template.bind({});
// Default.args = {

// };
