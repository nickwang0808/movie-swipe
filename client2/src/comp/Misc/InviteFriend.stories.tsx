import { Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import InviteFriend from "./InviteFriend";

export default {
  title: "Misc/InviteFriend",
  component: InviteFriend,
};

const template: Story<ComponentProps<typeof InviteFriend>> = (arg) => (
  <InviteFriend {...arg} />
);

export const Default = template.bind({});

Default.args = {
  message: "Something happened",
};
