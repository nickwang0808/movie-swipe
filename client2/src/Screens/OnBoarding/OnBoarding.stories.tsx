import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import OnBoardScreenOne from "./OnBoardScreenOne";

export default {
  title: "Screens/OnBoarding",
  component: OnBoardScreenOne,
} as Meta;

const Template = () => <OnBoardScreenOne />;

export const Default = Template.bind({});
