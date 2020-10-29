import React from "react";
import StreamingServiceButton from "../ButtonComps/StreamingService";
import CheckboxButton from "../ButtonComps/Checkbox";
import style from "./Filters.module.css";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";


export default function Filters({
  setFilterOn,
}: {
  setFilterOn: (arg: boolean) => void;
}) {
  return (
    <>
      <div className={style.container_filter}>
        <div className={sharedstyle.btn_close} onClick={() => setFilterOn(false)}>
        <svg width="20" height="19" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.98531 10.9853L2.00003 18.9706L0.58582 17.5563L8.57109 9.57108L1.00002 2L2.41423 0.585786L9.98531 8.15686L17.5564 0.585786L18.9706 2L11.3995 9.57108L19.3848 17.5563L17.9706 18.9706L9.98531 10.9853Z"/>
</svg>

        </div>
        <div className={style.header}>
          <h1>Refine Suggestions</h1>
        </div>
        {/* <div className={style.title}>
          <h2>Streaming Services</h2>
        </div>
        <div className={style.streaming_list}>
          <StreamingServiceButton />
        </div> */}
        <div className={style.title}>
          <h2>Media Types</h2>
        </div>
        <div className={style.types_list}>
          <CheckboxButton name="Movies"/>
          <CheckboxButton name="TV Shows"/>
        </div>
        <div className={style.title}>
          <h2>Genres</h2>
        </div>
        <div className={style.genres_list}>
        <CheckboxButton name="Genre"/>
        </div>
      </div>
    </>
  );
}