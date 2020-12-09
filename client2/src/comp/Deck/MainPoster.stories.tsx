import { Meta, Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import MainPoster from "./MainPoster";

export default {
  title: "Deck/MainPoster",
  component: MainPoster,
} as Meta;

const Template: Story<ComponentProps<typeof MainPoster>> = (args) => (
  <MainPoster {...args} />
);

export const Default = Template.bind({});
Default.args = {
  imgUrl: "/awcPLFFYjufRXd2oAAP6ZIXF9vM.jpg",
};
