import { Meta, Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import SlideInThumb from "./SlideInThumb";

export default {
  title: "Deck/SlideInThumb",
  component: SlideInThumb,
} as Meta;

const Template: Story<ComponentProps<typeof SlideInThumb>> = (args) => (
  <SlideInThumb {...args} />
);

export const Default = Template.bind({});
Default.args = {
  devMode: true,
  type: "like",
};
