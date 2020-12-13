import { Meta, Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import DeleteFriendModal from "./DeleteFriendModal";

export default {
  title: "Modals/DeleteFriendModal",
  component: DeleteFriendModal,
} as Meta;

const Template: Story<ComponentProps<typeof DeleteFriendModal>> = (args) => (
  <DeleteFriendModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  closeAction: () => console.log("close"),
};
