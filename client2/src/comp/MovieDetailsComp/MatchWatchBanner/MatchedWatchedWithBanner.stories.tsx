import { Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import MatchedWatchedWithBanner from "./MatchedWatchedWithBanner";

export default {
  title: "Misc/MatchedWatchedWithBanner",
  component: MatchedWatchedWithBanner,
};

const template: Story<ComponentProps<typeof MatchedWatchedWithBanner>> = (
  arg
) => <MatchedWatchedWithBanner {...arg} />;

export const Default = template.bind({});

Default.args = {
  matches: true,
  watchedWith: false,
};
