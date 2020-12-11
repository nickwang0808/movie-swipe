import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import { CenterLoader } from "./LoadingSpinner";

export default {
  title: "Misc/CenterLoader",
  component: CenterLoader,
} as Meta;

export const Default = () => <CenterLoader />;
