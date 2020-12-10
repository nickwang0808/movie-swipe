import React from "react";
import styled from "styled-components/macro";

interface IListViewButton {
  title: string;
  action?: () => void;
}

export default function ProfileItem({ title, action }: IListViewButton) {
  return <StyledDiv onClick={() => action && action()}>{title}</StyledDiv>;
}

const StyledDiv = styled.div`
  padding-left: 2rem;
  font-size: 2em;
  height: 6rem;
  line-height: 6rem;
  border-bottom: var(--border-bottom);
  cursor: pointer;
`;
