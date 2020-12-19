import { Meta, Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import ModalBase from "./ModalBase";

export default {
  title: "Modals/ModalBase",
  component: ModalBase,
} as Meta;

const Template: Story<ComponentProps<typeof ModalBase>> = (args) => (
  <ModalBase {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: <h2>Hello</h2>,
  closeAction: () => console.log("close"),
};
