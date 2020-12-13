import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import Logo from "../../Assets/svg/Logo";
import FilterButton from "../../comp/Buttons/FilterButton";
import MainBackground from "../../comp/Layout/MainBackground";

interface IProps {
  imgUrl: string;
}

export default function MainScreenMisc({ imgUrl }: IProps) {
  return (
    <>
      <MainBackground ImgUrl={imgUrl} />
      <StyledMotionDiv
      // animate={{ opacity: 1, paddingTop: "0rem" }}
      // initial={{ opacity: 0, paddingTop: "2rem" }}
      // transition={{
      //   duration: 0.75,
      //   ease: [0.16, 1, 0.3, 1],
      // }}
      >
        <Logo />
        <FilterButton setFilterOn={() => console.log("filter modal")} />
      </StyledMotionDiv>
    </>
  );
}

const StyledMotionDiv = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: var(--header);
  width: 100%;
  left: 0;
  right: 0;

  justify-content: flex-end;
`;
