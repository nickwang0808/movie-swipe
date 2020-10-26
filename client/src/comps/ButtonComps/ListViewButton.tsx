import React from "react";
import style from "./ButtonComps.module.css";

export default function ListViewButton(props: { name: React.ReactNode }) {
  return <div className={style.btn_listview}>{props.name}</div>;
}
