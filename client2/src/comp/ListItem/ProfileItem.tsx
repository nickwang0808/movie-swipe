import React from "react";
import styled from "styled-components/macro";
import Badge from "../Misc/Badge";

interface IListViewButton {
  title: string;
  action?: () => void;
  notify?: number;
}

export default function ProfileItem({
  title,
  action,
  notify,
}: IListViewButton) {
  return (
    <StyledDiv onClick={() => action && action()}>
      {title}
      {notify && notify > 0 && <Badge counter={notify} align={true} />}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding: 0 2rem;
  font-size: 2em;
  height: 6rem;
  line-height: 6rem;
  border-bottom: var(--border-bottom);
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
