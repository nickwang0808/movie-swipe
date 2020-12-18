import React from "react";
import { ReactComponent as LogoTMDB } from "../../img/logo_tmdb.svg";
import BackButton from "../ButtonComps/BackButton";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import style from "./MyProfile.module.css";

export default function About() {
  return (
    <div className="container_allcontent">
      <h1>
        <BackButton linkTo="/profile" />
        About MovieSync
      </h1>
      <div className={style.container_aboutcontent}>
        <div className="container_subcontent">
          <p className="marginSides2 marginTop2 marginBottom2">
            MovieSync is an easy way to find something new for you and your
            friends to watch together, finally.
          </p>
          <p className="marginSides2">
            {" "}
            It's developed by Nick Wang (NickWangTech.com) and designed by
            Trevor Wernisch (No-Tec.com).
          </p>
        </div>
        <div className="container_subcontent">
          <div className={`${"title"} ${"marginBottom2"}`}>
            <div className="listview_separator_full" />
            <h2>Need to chat?</h2>
          </div>
          <div className={style.container_inset}>
            <div
              onClick={() => window.open("mailto:Hello@Movie-Sync.com")}
              className={`${sharedstyle.btn}`}
            >
              Hello@Movie-Sync.com
            </div>
            {/* <p>
              Email: <b>Hello@Movie-Sync.com</b>
            </p> */}
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
            <p>Version: 1.1.2</p>
          </div>
        </div>
      </div>
    </div>
  );
}
