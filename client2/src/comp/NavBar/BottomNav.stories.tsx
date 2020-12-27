import { Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import BottomNav from "./BottomNav";

export default {
  title: "Nav/BottomNav",
  component: BottomNav,
};

const template: Story<ComponentProps<typeof BottomNav>> = (arg) => (
  <BottomNav {...arg} />
);

export const Default = template.bind({});

Default.args = {
  profileBadgeCounter: 1,
  watchListBadgeCounter: 0,
};
