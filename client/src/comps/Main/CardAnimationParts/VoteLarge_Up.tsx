import React from "react";
import style from "./style.module.css";
import { motion, MotionValue } from "framer-motion";

interface IVoteLarge_Up {
  thumbX: MotionValue<number>;
  thumbOpacity: MotionValue<number>;
}

export default function VoteLarge_Up({ thumbX, thumbOpacity }: IVoteLarge_Up) {
  return (
    <motion.div
      className={`${style.voted_thumb} ${style.up}`}
      style={{ x: thumbX, opacity: thumbOpacity }}
    >
      <svg
        width={128}
        height={128}
        viewBox="0 0 24 24"
        fill="var(--positive)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.4613 9.08947H14.5385L15.4837 2.56529C15.6798 1.21208 14.629 0 13.2633 0C12.3496 0 11.535 0.546039 11.188 1.39105C9.98427 4.32243 8.624 7.63423 6.50747 9.08947H0.752962C0.337139 9.08947 0 9.42661 0 9.84244V20.9738C0 22.6425 1.35759 24 3.02625 24H6.73299C7.14881 24 7.48595 23.6629 7.48595 23.2471V22.8537C9.04025 23.9374 9.05131 24 9.36675 24H17.5021C18.9249 24 20.2522 23.2355 20.966 22.0047L22.4911 19.3754C23.0702 18.3768 23.3763 17.2389 23.3763 16.0846V12.0045C23.3763 10.3971 22.0686 9.08947 20.4613 9.08947ZM5.97998 22.4941H3.02625C2.18797 22.4941 1.50592 21.8121 1.50592 20.9738V10.5954H5.97998V22.4941ZM21.8703 16.0845C21.8703 16.9738 21.6345 17.8505 21.1883 18.6199L19.6634 21.2492C19.218 22.0171 18.3898 22.4941 17.5021 22.4941H9.60327L7.4859 21.0179V10.2423C9.89599 8.5015 11.3189 5.03666 12.5811 1.96311C12.6951 1.68541 12.9629 1.50592 13.2633 1.50592C13.7111 1.50592 14.0582 1.90146 13.9933 2.34934L12.9234 9.73443C12.8578 10.1871 13.2087 10.5954 13.6685 10.5954H20.4613C21.2382 10.5954 21.8703 11.2275 21.8703 12.0044V16.0845Z" />
      </svg>
    </motion.div>
  );
}
