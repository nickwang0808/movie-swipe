import React from "react"
import style from "./index.module.css"
import Card1 from "../comp/cards/Card1"
import Card2 from "../comp/cards/Card2"
import Card3 from "../comp/cards/Card3"
import Title from "../comp/title/Title"
import Video from "../comp/video/Video"
import OR from "../comp/OR/OR"

import { Link } from "gatsby"

export default function Home() {
  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
          <Title />
          <Video />
          <div className={style.card_grid}>
            <Card1 />
            <Card2 />
            <Card3 />
          </div>
          <a className={style.button} href="https://app.movie-sync.com">
            Start Swiping
          </a>
          {/* <div>(Must use mobile device)</div> */}
          <OR />

          <div
            className={style.get_it}
            onClick={() =>
              (window.location =
                "https://play.google.com/store/apps/details?id=movie.sync")
            }
          >
            Get it on
            <img src="googleplay.png" alt="google play icon" />
          </div>
        </div>
        <div className={style.footer}>
          <a className={style.contact} href="mailto:hello@movie-sync.com">
            Say Hello
          </a>
          <div className={style.links}>
            <Link className={style.links} href="terms">
              Terms of Use and Privacy Policy
            </Link>
            <span> © Fox & Grey LLC, 2020</span>
          </div>
        </div>
      </div>
    </>
  )
}
