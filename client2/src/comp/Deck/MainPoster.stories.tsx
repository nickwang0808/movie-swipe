import { Meta, Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import { dummyState } from "../../DevTools/dummyState";
import parseCerts from "../../Helper/parseCerts";
import MainPoster from "./MainPoster";

export default {
  title: "Deck/MainPoster",
  component: MainPoster,
} as Meta;

const Template: Story<ComponentProps<typeof MainPoster>> = (args) => (
  <MainPoster {...args} />
);

export const Default = Template.bind({});

const {
  release_dates,
  runtime,
  genre_ids,
  release_date,
} = dummyState.movieList.movieList[0];

Default.args = {
  imgUrl: "/4ZocdxnOO6q2UbdKye2wgofLFhB.jpg",
  showAdditionalInfo: true,
  movieInfo: {
    // @ts-ignore
    certs: parseCerts(release_dates),
    // @ts-ignore
    runTime: runtime,
    genreIds: genre_ids,
    year: String(release_date).slice(0, 4),
  },
  // additionalInfo: undefined
};
