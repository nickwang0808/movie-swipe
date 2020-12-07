import { Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import ScreenWIthHeader from "./ScreenWIthHeader";

export default {
  title: "Layout/ScreenWIthHeader",
  component: ScreenWIthHeader,
};

const template: Story<ComponentProps<typeof ScreenWIthHeader>> = (arg) => (
  <ScreenWIthHeader {...arg} />
);

export const Default = template.bind({});

Default.args = {
  title: "Title",
  showBackButton: true,
  children: <h2>Hello</h2>,
};
