import { Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import WatchedTag from "./WatchedTag";

export default {
  title: "Misc/WatchedTag",
  component: WatchedTag,
};

const template: Story<ComponentProps<typeof WatchedTag>> = (arg) => (
  <WatchedTag {...arg} />
);

export const Default = template.bind({});

Default.args = {
  name: ["Nick Wang"],
};
