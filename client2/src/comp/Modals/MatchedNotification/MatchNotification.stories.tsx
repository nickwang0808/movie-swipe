import { Meta, Story } from "@storybook/react/types-6-0";
import React, { ComponentProps } from "react";
import { dummyMovieList } from "../../../DevTools/dummyData";
import MainBackground from "../../Layout/MainBackground";
import MatchNotification from "./MatchNotification";

export default {
  title: "Modals/MatchNotification",
  component: MatchNotification,
} as Meta;

const Template: Story<ComponentProps<typeof MatchNotification>> = (args) => (
  <>
    <MainBackground ImgUrl={args.poster} />
    <MatchNotification {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  closeModal: () => console.log("close"),
  name: ["Nick Wang"],
  movieId: 123456,
  poster: dummyMovieList.results[0].poster_path,
  title: "Random Movie",
  showModal: true,
};
