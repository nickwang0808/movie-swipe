import { Meta, Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import CircleDial from "./CircleDial";

export default {
  title: "CircleDial",
  component: CircleDial,
} as Meta;

const Template: Story<ComponentProps<typeof CircleDial>> = (args) => (
  <CircleDial {...args} />
);

export const Default = Template.bind({});
Default.args = {
  number: 70,
};
