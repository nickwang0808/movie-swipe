import React from "react";
import { Link } from "react-router-dom";
import style from "./ButtonComps.module.css";

interface IListViewButton {
  name: React.ReactNode;
  action?: () => void;
}

export default function ListViewButton({ name, action }: IListViewButton) {
  if (action) {
    return (
      <div className={style.btn_listview} onClick={action}>
        {name}
      </div>
    );
  } else {
    return <div className={style.btn_listview}>{name}</div>;
  }
}
