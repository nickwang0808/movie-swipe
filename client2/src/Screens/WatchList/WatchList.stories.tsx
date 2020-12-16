import React from "react";
import WatchList from "./WatchList";

export default {
  title: "Screen/WatchList",
  component: WatchList,
};

export const Default = () => <WatchList setShowDetailModal={() => {}} />;
