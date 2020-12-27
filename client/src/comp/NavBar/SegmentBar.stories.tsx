import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import SegmentBar from "./SegmentBar";

export default {
  title: "Nav/SegmentBar",
  component: SegmentBar,
} as Meta;

const Template = () => <SegmentBar view={"watched"} setView={() => {}} />;

export const Default = Template.bind({});
