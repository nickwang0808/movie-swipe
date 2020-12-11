import { animate, useMotionValue, useTransform } from "framer-motion";

export default function useAnimateDeck(screenWidth: number) {
  const xMotionValue = useMotionValue(0); // to control the deck via button
  const likeSlider = useMotionValue(0); // let deck control slider
  const backgroundSlide = useTransform(likeSlider, (value) => value * 2.5);

  const thumbMotionValue = useMotionValue(0); // let deck control thumb
  const thumbX = useTransform(thumbMotionValue, (value) => value / 1.5);
  const thumbOpacityMotionValue = useMotionValue(0);
  const thumbOpacity = useTransform(
    thumbOpacityMotionValue,
    (value) => Math.abs(value / 300) // the higher num the slower it adds opacity
  );

  const animateSliderAndThumb = (direction: number, thumbDirection: 1 | -1) => {
    animate(likeSlider, direction * 1.2, {
      type: "tween",
      duration: 1,
      ease: [0.33, 1, 0.68, 1],
      onComplete: () => {
        likeSlider.set(0); // don't remove this
      },
    });

    // this controls where the thumb to animate to
    animate(thumbMotionValue, screenWidth * thumbDirection, {
      type: "tween",
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    });

    // this controls thumb opacity
    animate(thumbOpacityMotionValue, [300, 0], {
      ease: "easeIn",
      duration: 0.5,
      onComplete: () => {},
    });
  };

  const VoteWithAnimation = (isLike: boolean) => {
    animate(xMotionValue, isLike ? screenWidth : -screenWidth, {
      type: "tween",
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
      onComplete: () => {
        xMotionValue.set(0);
      },
    });
    animateSliderAndThumb(isLike ? screenWidth : -screenWidth, isLike ? 1 : -1);
  };

  return {
    xMotionValue,
    likeSlider,
    backgroundSlide,
    thumbMotionValue,
    thumbX,
    thumbOpacityMotionValue,
    thumbOpacity,
    VoteWithAnimation,
  };
}