import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface iProps {
  number: number;
}

export default function CircleDial({ number }: iProps) {
  return (
    <div>
      <CircularProgressbar value={number} maxValue={1} text={String(number)} />;
    </div>
  );
}
