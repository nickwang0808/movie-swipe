import { Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import WatchListItem from "./WatchListItem";

export default {
  title: "ListItem/WatchListItem",
  component: WatchListItem,
};

const template: Story<ComponentProps<typeof WatchListItem>> = (arg) => (
  <WatchListItem {...arg} />
);

export const Default = template.bind({});

Default.args = {
  matched: false,
  watched: false,
  movie: {
    title: "Once Upon a Snowman",
    id: 213123,
    poster_path: "/qzA87Wf4jo1h8JMk9GilyIYvwsA.jpg",
  },
};
