import { Meta, Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import { dummyUserList } from "../../DevTools/dummyUsers";
import WatchedWithWho from "./WatchedWithWho";

export default {
  title: "Modals/WatchedWithWho",
  component: WatchedWithWho,
} as Meta;

const Template: Story<ComponentProps<typeof WatchedWithWho>> = (args) => (
  <WatchedWithWho {...args} />
);

export const Default = Template.bind({});
Default.args = {
  movieId: 123412,
  matches: dummyUserList,
};
