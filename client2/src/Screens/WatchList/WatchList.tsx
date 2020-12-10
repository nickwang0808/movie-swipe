import React from "react";
import ScreenWIthHeader from "../../comp/Layout/ScreenWIthHeader";
import WatchListItem from "../../comp/ListItem/WatchListItem";
import WatchListEmpty from "../../comp/Misc/WatchListEmpty";
import TopTab from "../../comp/NavBar/TopTab";

const dummy = {
  matched: false,
  watched: false,
  movie: {
    title: "Once Upon a Snowman",
    id: 213123,
    poster_path: "/qzA87Wf4jo1h8JMk9GilyIYvwsA.jpg",
  },
};

export default function WatchList() {
  return (
    <ScreenWIthHeader title="My Watch List">
      <TopTab />
      <WatchListEmpty type="like" />
      <WatchListItem {...dummy} />
      <WatchListItem {...dummy} />
      <WatchListItem {...dummy} />
      <WatchListItem {...dummy} />
    </ScreenWIthHeader>
  );
}
