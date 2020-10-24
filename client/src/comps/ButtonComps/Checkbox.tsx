import React from "react";
import style from "./Checkbox.module.css";

export default function CheckboxButton() {
  return (
    <div className={style.checkbox}>
        <input type="checkbox" id="type"/>
        <label htmlFor="type">Movies</label>
    </div>
  );
}
