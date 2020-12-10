import React from "react";
import styled from "styled-components/macro";
import BackButton from "../Buttons/BackButton";

interface IProps {
  title: string;
  showBackButton?: boolean;
  children: React.ReactNode;
}

export default function ScreenWIthHeader({
  title,
  showBackButton = false,
  children,
}: IProps) {
  return (
    <>
      <h1>
        {showBackButton && <BackButton />}
        {title}
      </h1>
      <Content>{children}</Content>
    </>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  /* box-sizing: border-box; */
`;
