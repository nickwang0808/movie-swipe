import { Meta, Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import Providers from "./Providers";

export default {
  title: "Providers",
  component: Providers,
} as Meta;

const Template: Story<ComponentProps<typeof Providers>> = (args) => (
  <Providers {...args} />
);

export const Default = Template.bind({});
Default.args = {
  providers: ["dwadwa"],
};
