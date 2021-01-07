import { menuController } from "@ionic/core";
import React from "react";
import styled from "styled-components";
import Logo from "../../Assets/svg/Logo";
import FilterButton from "../../comp/Buttons/FilterButton";

export default function MainScreenMisc() {
  return (
    <>
      <StyledMotionDiv
      // animate={{ opacity: 1, paddingTop: "0rem" }}
      // initial={{ opacity: 0, paddingTop: "2rem" }}
      // transition={{
      //   duration: 0.75,
      //   ease: [0.16, 1, 0.3, 1],
      // }}
      >
        <Logo />
        <FilterButton setFilterOn={() => menuController.toggle()} />
      </StyledMotionDiv>
    </>
  );
}

const StyledMotionDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: var(--header);
  width: 100%;
  left: 0;
  right: 0;

  justify-content: flex-end;
`;
