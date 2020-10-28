import React from "react";
import style from "./ButtonComps.module.css";

export default function CheckboxButton(props: { name: React.ReactNode; }) {
  return (
    <div className={style.checkbox}>
        <input type="checkbox" id="type"/>
        <label htmlFor="type">{props.name}</label>
    </div>
  );
}
