import { Meta, Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import { dummyMovieList } from "../../DevTools/dummyData";
import Deck from "./Deck";

export default {
  title: "Main/Deck",
  component: Deck,
} as Meta;

const Template: Story<ComponentProps<typeof Deck>> = (args) => (
  <Deck {...args} />
);

export const Default = Template.bind({});
Default.args = {
  movieListInDeck: dummyMovieList.results.slice(0, 4),
};
