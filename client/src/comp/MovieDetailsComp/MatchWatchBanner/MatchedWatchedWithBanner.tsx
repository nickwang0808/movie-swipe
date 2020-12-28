import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components/macro";
import SolidThumbUp from "../../../Assets/svg/SolidThumbUp";
import watchedMovie from "../../../firebase/firestoreOperations/watchedMovie";
import { IProfileDetails } from "../../../redux/Profile/profileReducer";
import { Btn } from "../../../theme/BaseComp";
import WatchedWithWho from "../../Modals/WatchedWithWho";
import Matches from "./Matches";

interface IProps {
  matches?: IProfileDetails[];
  watchedWith?: IProfileDetails[];
  movieId: string | number;
}

const Ease = [0.16, 1, 0.3, 1];

export default function MatchedWatchedWithBanner({
  matches,
  watchedWith,
  movieId,
}: IProps) {
  const handleWatched = (matchedWithIds: string[]) =>
    watchedMovie(matchedWithIds, movieId as number);

  return (
    <>
      <AnimatePresence>
        <div>
          <Wrapper>
            <SubWrapper>
              <WatchedAnimatedBlock
                key="watched1"
                animate={watchedWith ? { left: "7rem" } : {}}
                transition={{
                  duration: 1,
                  ease: Ease,
                }}
              >
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  Watched with{" "}
                  <strong>
                    {watchedWith
                      ?.map(
                        (info) => info.displayName || info.email || info.uid
                      )
                      .join(", ")}
                  </strong>
                </motion.p>
              </WatchedAnimatedBlock>
            </SubWrapper>

            <ThumbUpWrapper
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                ease: Ease,
              }}
            >
              <SolidThumbUp />
            </ThumbUpWrapper>

            {matches && <Matches matches={matches} />}
          </Wrapper>
        </div>
        {matches &&
          (matches.length > 1 ? (
            <WatchedWithWho
              handleWatched={handleWatched}
              matches={matches as IProfileDetails[]}
            />
          ) : (
            <StyledButton
              key="watchedButton" // don't remove this
              // disabled={disabledWatchedButton}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: Ease }}
              onClick={() => {
                handleWatched([matches[0].uid]);
              }}
            >
              {matches.length > 1 ? "Watched with..." : "We've watched this!"}
            </StyledButton>
          ))}
      </AnimatePresence>
    </>
  );
}

const StyledButton = styled(motion.custom(Btn))`
  margin: auto;
  //margin-bottom: 4rem;

  &:active {
    border-color: var(--highlight);
    color: var(--highlight);
  }
`;

const ThumbUpWrapper = styled(motion.div)`
  position: absolute;
  left: 2rem;
  top: 2rem;
  fill: var(--dark);
`;

const WatchedAnimatedBlock = styled(motion.div)`
  background-color: var(--positive);
  transform: skewX(-15deg);
  left: calc(-100% + 7rem);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;

  & p {
    transform: skewX(15deg);
    font-size: 1.8rem;
    font-weight: 400;
    padding: 0 10rem 0 3rem;
    text-align: left;
    line-height: 2rem;
  }
`;

const SubWrapper = styled.div`
  grid-template-rows: 100%;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border: 1px solid var(--positive);
  background-color: var(--light);
  position: relative;
  font-size: 1.8rem;
  line-height: 2rem;
  font-weight: 400;
  text-align: left;
  fill: var(--positive);
  padding: 1rem 0;
  min-height: 5rem;
`;
