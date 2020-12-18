import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import VoteButtonGroupV2 from "./VoteButtonGroupV2";

export default {
  title: "ButtonGroups/VoteButtonGroupV2",
  component: VoteButtonGroupV2,
} as Meta;

const Template = () => <VoteButtonGroupV2 />;

export const Default = Template.bind({});
