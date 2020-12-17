import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import FilterMenu from "./FilterMenu";

export default {
  title: "Misc/FilterMenu",
  component: FilterMenu,
} as Meta;

const Template = () => <FilterMenu />;

export const Default = Template.bind({});
