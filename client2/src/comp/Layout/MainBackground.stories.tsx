import { Meta, Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import MainBackground from "./MainBackground";

export default {
  title: "Main/Background",
  component: MainBackground,
} as Meta;

const Template: Story<ComponentProps<typeof MainBackground>> = (args) => (
  <MainBackground {...args} />
);

export const Default = Template.bind({});
Default.args = {
  ImgUrl: "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
};
