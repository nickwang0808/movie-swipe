import React from "react";
import styled from "styled-components/macro";
import NoLikedIcon from "../../Assets/svg/NoLikedIcon";
import NoWatchedIcon from "../../Assets/svg/NoWatchedIcon";

interface IProps {
  type: "like" | "watch";
}

export default function WatchListEmpty({ type }: IProps) {
  let icon, message;
  if (type === "like") {
    icon = <NoLikedIcon />;
    message = "No liked movies yet!";
  } else if (type === "watch") {
    icon = <NoWatchedIcon />;
    message =
      "The movies you and your friends have watched together will go here.";
  }

  return (
    <Wrapper>
      <div className="marginTop6">{icon}</div>
      <p className="marginSides2 marginTop2">{message}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
