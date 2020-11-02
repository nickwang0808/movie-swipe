import React from "react";
import { Link } from "react-router-dom";
import sharedstyle from "./ButtonComps.module.css";

export default function BackButton({ linkTo }: IBackButton) {
  return (
    <Link to={linkTo} className={sharedstyle.btn_Back}>
      <svg
        width="20"
        height="18"
        viewBox="0 0 20 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.7071 1.70712L9.29292 0.292908L0.585815 9.00001L9.29292 17.7071L10.7071 16.2929L4.41423 10H19.5V8H4.41426L10.7071 1.70712Z" />
      </svg>
    </Link>
  );
}

interface IBackButton {
  linkTo: string;
}
