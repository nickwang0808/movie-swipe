import { Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import PendingInviteItem from "./PendingInviteItem";

export default {
  title: "ListItem/PendingInviteItem",
  component: PendingInviteItem,
};

const template: Story<ComponentProps<typeof PendingInviteItem>> = (arg) => (
  <PendingInviteItem {...arg} />
);

export const Default = template.bind({});

Default.args = {
  action: () => console.log("action"),
  handleAccept: () => console.log("action"),
  handleDecline: () => console.log("action"),
  name: "Nick Wang",
};
