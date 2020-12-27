import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import IonBottomNav from "./IonBottomNav";

export default {
  title: "Nav/IonBottomNav",
  component: IonBottomNav,
} as Meta;

const Template = () => <IonBottomNav />;

export const Default = Template.bind({});
