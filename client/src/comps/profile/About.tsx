import React, { useContext } from "react";
import style from "./MyProfile.module.css";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import BackButton from "../ButtonComps/BackButton";
import { ReactComponent as Logo_TMDB } from '../../img/logo_tmdb.svg';


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
            MovieSync is a fast and simple way to find something new for you and your friends to watch together, finally.
          </h2>
          <p className="marginSides2"> MovieSync is built by Nick Wang (development) and Trevor Wernisch (design).</p>
        </div>
        <div className="container_subcontent">
        <div className={`${"title"} ${"marginBottom2"}`}>
              <h2>Need to chat?</h2>
          </div>
          <div className={style.container_inset}>
              <div className={`${sharedstyle.btn} ${sharedstyle.btnInvite}`}>
                  Hello@Movie-Sync.com
              </div><div></div>
          </div>
        </div>
        <div className="container_subcontent">
          <div className={`${"title"} ${"marginBottom2"}`}>
              <h2>Contributions</h2>
          </div>
          <div className={`${style.container_inset}`}>
              <div className={style.container_logo_tmdb}><Logo_TMDB /></div>
              <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
