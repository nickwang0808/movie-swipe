import { Meta, Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import SliderBlock from "./SliderBlock";

export default {
  title: "Deck/SliderBlock",
  component: SliderBlock,
  Description: "comment out left and right css property to center it",
} as Meta;

const Template: Story<ComponentProps<typeof SliderBlock>> = (args) => (
  <SliderBlock {...args} />
);

export const Default = Template.bind({});
Default.args = {
  type: "dislike",
  devMode: true,
};
