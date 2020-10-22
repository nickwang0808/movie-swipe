import React, { useState } from "react";
import { useSprings, animated, interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";
import style from "./poster.module.css";
import convertHDimg from "../../HelperFunctions/convertHDimg";

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({ x: 0, y: 0, scale: 1 });
const from = (i) => ({ x: 0, rot: 0, scale: 1 });

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => ` rotateX(30deg) rotateY(${r / 10}deg) scale(${s})`;

export default function Deck({ movieList, setCurrentIndex }) {
  // const [start, setStart] = useState(0);
  // const [end, setEnd] = useState(4);
  let start = 0;
  let end = 4;
  const [localList, setLocalList] = useState(movieList.slice(0, 4));

  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, set] = useSprings(localList ? localList.length : 10, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity,
    }) => {
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) {
        if (dir > 0) {
          // console.log("like", movieList[index].title);
        } else {
          // console.log("dislike", movieList[index].title);
        }
        setCurrentIndex(index);
        gone.add(index);
      } // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      // TODO: if index < N, fetch and append more movies
      set((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });

      if (gone.has(index)) {
        setTimeout(() => {
          // console.log(movieList.slice(end + 1, end + 10));
          // console.log(localList[index].imageurl[0]);
          const newList = movieList.slice(11, 12);
          setLocalList((prev) => [...newList, ...prev]);
          end += 1;
        }, 1000);
      }

      // if (!down && gone.size === movieList.length) {
      //   setTimeout(() => gone.clear() || set((i) => to(i)), 600);
      // }

      // if (!down && localList.length - gone.size === 1) {
      //   console.log("empty");
      //   setStart((prev) => prev + 4);
      //   setEnd((prev) => prev + 4);
      //   setLocalList(movieList.slice(start, end));
      //   // setTimeout(() => gone.clear() || set((i) => to(i)), 200);
      //   gone.clear();
      // }
    }
  );
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)

  return (
    <>
     {/* <Filters /> */}
      <div className={style.poster}>
        {props.map(({ x, y, rot, scale }, i) => (
          <animated.div
            key={i}
            style={{
              transform: interpolate(
                [x, y],
                (x, y) => `translate3d(${x}px,${y}px, ${y * 10}px)` // continious scaling here
              ),
            }}
          >
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div
              className="poster_vote"
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
                backgroundImage: `linear-gradient(25.4deg, rgba(255, 255, 255, 0) 51.03%, rgba(255, 255, 255, 0.3) 58.85%, rgba(255, 255, 255, 0.3) 99.3%), linear-gradient(360deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 20%), url(${
                  localList && converHDimg(localList[i].imageurl[0])
                })`,
              }}
            />
          </animated.div>
        ))}
      </div>
    </>
  );
}
