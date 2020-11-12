import React from "react";
import style from "./ButtonComps.module.css";

interface ICheckboxButton {
  name: string;
  isChecked: boolean;
  setChecked: (arg: (arg: number[]) => number[]) => void;
  id: number;
}

export default function CheckboxButton({
  name,
  setChecked,
  isChecked,
  id,
}: ICheckboxButton) {
  return (
    <div className={style.checkbox}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          isChecked
            ? setChecked((prev) => prev.filter((elem) => elem !== id))
            : setChecked((prev) => [...prev, id]);
        }}
      />
      <label htmlFor="type">{name}</label>
    </div>
  );
}
