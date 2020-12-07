import { Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import TopTab from "./TopTab";

export default {
  title: "Nav/TopTab",
  component: TopTab,
};

const template: Story<ComponentProps<typeof TopTab>> = () => <TopTab />;

export const Default = template.bind({});
