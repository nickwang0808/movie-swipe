import { Meta, Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import VoteButtonGroupV2 from "./VoteButtonGroupV2";

export default {
  title: "ButtonGroups/VoteButtonGroupV2",
  component: VoteButtonGroupV2,
} as Meta;

const Template: Story<ComponentProps<typeof VoteButtonGroupV2>> = (args) => (
  <VoteButtonGroupV2 {...args} />
);

export const Default = Template.bind({});
Default.args = {
  handleDetails: () => console.log("Click middle"),
  handleDislike: () => console.log("dislike"),
  handleLike: () => console.log("Like"),
  handleTrailer: () => {},
};
