import { Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import FriendsItem from "./FriendsItem";

export default {
  title: "ListItem/FriendsItem",
  component: FriendsItem,
};

const template: Story<ComponentProps<typeof FriendsItem>> = (arg) => (
  <FriendsItem {...arg} />
);

export const Default = template.bind({});

Default.args = {
  name: "Nick",
};
