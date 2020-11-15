import React from "react";
import style from "./MyProfile.module.css";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import BackButton from "../ButtonComps/BackButton";
import { ReactComponent as LogoTMDB } from "../../img/logo_tmdb.svg";

export default function About() {
  return (
    <div className="container_allcontent">
      <div className={style.container_header}>
        <h1>
          <BackButton linkTo="/profile" />
          About MovieSync
        </h1>
      </div>
      <div className={style.container_aboutcontent}>
        <div className="container_subcontent">
          <h2 className={style.title_bold}>
            MovieSync is an easy way to find something new for you and your
            friends to watch together, finally.
          </h2>
          <p className="marginSides2">
            {" "}
            MovieSync is developed by Nick Wang (NickWangTech.com) and designed
            by Trevor Wernisch (No-Tec.com).
          </p>
        </div>
        <div className="container_subcontent">
          <div className={`${"title"} ${"marginBottom2"}`}>
            <div className="listview_separator_full" />
            <h2>Need to chat?</h2>
          </div>
          <div className={style.container_inset}>
            <div className={`${sharedstyle.btn}`}>Hello@Movie-Sync.com</div>
          </div>
        </div>
        <div className="container_subcontent">
          <div className={`${"title"} ${"marginBottom2"}`}>
            <div className="listview_separator_full" />

            <h2>Contributions</h2>
          </div>
          <div className={`${style.container_inset}`}>
            <div className={style.container_logo_tmdb}>
              <LogoTMDB />
            </div>
            <p>
              This product uses the TMDb API but is not endorsed or certified by
              TMDb.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
