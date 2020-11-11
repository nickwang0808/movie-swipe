import React, { useState } from "react";
// import StreamingServiceButton from "../ButtonComps/StreamingService";
import CheckboxButton from "../ButtonComps/Checkbox";
import style from "./Filters.module.css";
import sharedStyle from "../ButtonComps/ButtonComps.module.css";
import { motion } from "framer-motion";
import genreList from "../other/genreList";
import updateGenrePreference from "../../db-operations/updateGenrePreference";

interface IFilters {
  setFilterOn: (arg: boolean) => void;
  genrePref: number[];
  userId: string;
}

export default function Filters({ setFilterOn, userId, genrePref }: IFilters) {
  const [checked, setChecked] = useState<number[]>(genrePref);

  return (
    <>
      <motion.div
        key="filter_container"
        animate={{ x: 0 }}
        initial={{ x: "100vw" }}
        exit={{ x: "100vw" }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={style.container_filter}
      >
        <button
          onClick={async () => {
            await updateGenrePreference(userId, checked);
            window.location.reload();
          }}
        >
          Save
        </button>
        <div
          className={sharedStyle.btn_close}
          onClick={() => setFilterOn(false)}
        >
          <svg
            width="20"
            height="19"
            viewBox="0 0 20 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.98531 10.9853L2.00003 18.9706L0.58582 17.5563L8.57109 9.57108L1.00002 2L2.41423 0.585786L9.98531 8.15686L17.5564 0.585786L18.9706 2L11.3995 9.57108L19.3848 17.5563L17.9706 18.9706L9.98531 10.9853Z"
            />
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
        {/* <div className="container_subcontent">
          <div className={`${"title"} ${"marginBottom2"}`}>
            <h2>Media Types</h2>
          </div>
          <div className={style.types_list}>
            <CheckboxButton
              name="Movies"
              checked={checked}
              setChecked={setChecked}
            />
          </div>
        </div> */}
        <div className="container_subcontent">
          <div className={`${"title"} ${"marginBottom2"}`}>
            <div className="listview_separator_full" />
            <h2>Genres</h2>
          </div>
          <div className={style.genres_list}>
            {genreList.movie.map((genre) => {
              return (
                <CheckboxButton
                  key={genre.id}
                  id={genre.id}
                  name={genre.name}
                  setChecked={setChecked}
                  isChecked={
                    checked.find((elem) => elem === genre.id) ? true : false
                  }
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
}
