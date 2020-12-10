import { Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import VoteButtonGroup from "./VoteButtonGroup";

export default {
  title: "ButtonGroup/VoteButtonGroup",
  component: VoteButtonGroup,
};

const template: Story<ComponentProps<typeof VoteButtonGroup>> = (arg) => (
  <VoteButtonGroup {...arg} />
);

export const Default = template.bind({});

Default.args = {
  MiddleButtonText: "Details",
  handleClickMiddleButton: () => console.log("Click middle"),
  handleDislike: () => console.log("dislike"),
  handleLike: () => console.log("Like"),
};
