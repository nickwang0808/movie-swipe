import React from "react";
import { Link } from "react-router-dom";
import style from "./ButtonComps.module.css";

interface IDownVote {
  handleDislike: () => void;
  isLiked?: boolean;
  changeToDisLike?: () => void;
}

export default function DownVote({
  handleDislike,
  isLiked,
  changeToDisLike,
}: IDownVote) {
  const icon = (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.91505 14.9106L8.83784 14.9106L7.89264 21.4348C7.69654 22.788 8.7473 24 10.113 24C11.0267 24 11.8413 23.454 12.1883 22.609C13.392 19.6776 14.7523 16.3658 16.8688 14.9106H22.6233C23.0392 14.9106 23.3763 14.5734 23.3763 14.1576V3.02625C23.3763 1.35759 22.0187 -1.45879e-07 20.3501 0L16.6433 3.24053e-07C16.2275 3.60406e-07 15.8904 0.33714 15.8904 0.752963V1.14634C14.3361 0.0626378 14.325 5.26728e-07 14.0096 5.54305e-07L5.87419 1.26552e-06C4.45142 1.3899e-06 3.12408 0.764587 2.41028 1.99535L0.885246 4.62465C0.306125 5.62321 -1.00915e-07 6.76113 0 7.91547L3.56691e-07 11.9955C4.81809e-05 13.6029 1.30771 14.9106 2.91505 14.9106ZM17.3963 1.50597L20.3501 1.50597C21.1883 1.50597 21.8704 2.18797 21.8704 3.02629L21.8704 13.4047H17.3963L17.3963 1.50597ZM1.50597 7.91551C1.50597 7.02622 1.74179 6.14954 2.18797 5.3802L3.71295 2.7509C4.15832 1.98297 4.98649 1.50593 5.87423 1.50593L13.773 1.50592L15.8904 2.98215L15.8904 13.7577C13.4803 15.4985 12.0574 18.9634 10.7952 22.0369C10.6812 22.3146 10.4134 22.4941 10.113 22.4941C9.66521 22.4941 9.31809 22.0986 9.38303 21.6507L10.4529 14.2656C10.5185 13.8129 10.1676 13.4047 9.7078 13.4047L2.91505 13.4047C2.13808 13.4047 1.50597 12.7726 1.50597 11.9956L1.50597 7.91551Z" />
    </svg>
  );

  if (isLiked === undefined) {
    return (
      <Link
        to="/home"
        className={style.container_votebtn}
        onClick={handleDislike}
      >
        <div className={`${style.btn} ${style.btn_down}`}>{icon}</div>
      </Link>
    );
  } else {
    return (
      <div
        className={style.container_votebtn}
        onClick={() => {
          handleDislike();
          changeToDisLike && changeToDisLike();
        }}
      >
        <div
          className={`${style.btn} ${style.btn_down} ${
            isLiked === false && style.btn_forceActive
          }`}
        >
          {icon}
        </div>
      </div>
    );
  }
}
