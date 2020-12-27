import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components/macro";
import { IProfileDetails } from "../../../redux/Profile/profileReducer";

interface IProps {
  matches?: IProfileDetails[];
}

export default function Matches({ matches }: IProps) {
  return (
    <MatchedWrapper
      exit={{ opacity: 0, margin: "0rem" }}
      transition={{
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        delay: 1,
      }}
    >
      <div>
        <span className="heavy">
          {matches
            ?.map((match) => match.displayName || match.email || match.uid)
            .join(", ")}
        </span>
        &nbsp;wants to watch this too!
      </div>
    </MatchedWrapper>
  );
}

const MatchedWrapper = styled(motion.div)`
  margin: auto 1rem auto 9rem;
  display: flex;
  align-items: center;
  overflow-wrap: anywhere;
`;
