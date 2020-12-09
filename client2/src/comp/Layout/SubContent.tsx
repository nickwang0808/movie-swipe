import React from "react";
import styled from "styled-components/macro";
import { Separator } from "../../theme/BaseComp";

interface IProps {
  title: string;
  children: React.ReactNode;
}

export default function SubContent({ title, children }: IProps) {
  return (
    <Wrapper className="container_subcontent">
      <div>
        <Separator />
        <h2>{title}</h2>
      </div>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 2rem;

  & div::first-child {
    height: 5rem;
  }

  & div h2 {
    opacity: 0.75;
    font-size: 1.8rem;
    padding: 1rem 0 0 1em;
    line-height: 3rem;
  }
`;
