import React from "react";
import StreamingServiceButton from "../ButtonComps/StreamingService";
import CheckboxButton from "../ButtonComps/Checkbox";
import style from "./Filters.module.css";

export default function Filters() {
  return (
    <>
      <div className={style.container_filter}>
        <div className="btn_close">
          <svg width="30px" height="30px" viewBox="0 0 512.001 512.001">
            <path d="M284.286 256.002L506.143 34.144c7.811-7.811 7.811-20.475 0-28.285-7.811-7.81-20.475-7.811-28.285 0L256 227.717 34.143 5.859c-7.811-7.811-20.475-7.811-28.285 0-7.81 7.811-7.811 20.475 0 28.285l221.857 221.857L5.858 477.859c-7.811 7.811-7.811 20.475 0 28.285 3.905 3.905 9.024 5.857 14.143 5.857 5.119 0 10.237-1.952 14.143-5.857L256 284.287l221.857 221.857c3.905 3.905 9.024 5.857 14.143 5.857s10.237-1.952 14.143-5.857c7.811-7.811 7.811-20.475 0-28.285L284.286 256.002z" />
          </svg>
        </div>
        <div className={style.header}>
          <h1>Refine Suggestions</h1>
        </div>
        <div className={style.title}>
          <h2>Streaming Services</h2>
        </div>
        <div className={style.streaming_list}>
          <StreamingServiceButton />
          <StreamingServiceButton />
          <StreamingServiceButton />
          <StreamingServiceButton />
          <StreamingServiceButton />
          <StreamingServiceButton />
          <StreamingServiceButton />
          <StreamingServiceButton />
          <StreamingServiceButton />
          <StreamingServiceButton />
        </div>
        <div className={style.title}>
          <h2>Types</h2>
        </div>
        <div className={style.types_list}>
          <CheckboxButton />
          <CheckboxButton />
        </div>
        <div className={style.title}>
          <h2>Genres</h2>
        </div>
        <div className={style.genres_list}>
          <CheckboxButton />
          <CheckboxButton />
          <CheckboxButton />
          <CheckboxButton />
          <CheckboxButton />
          <CheckboxButton />
          <CheckboxButton />
          <CheckboxButton />
          <CheckboxButton />
          <CheckboxButton />
          <CheckboxButton />
          <CheckboxButton />
          <CheckboxButton />
          <CheckboxButton />
        </div>
      </div>
    </>
  );
}
