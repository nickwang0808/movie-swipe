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
          <div className={style.button}>Start Swiping</div>
          {/* <div>(Must use mobile device)</div> */}
          <OR />

          <div className={style.get_it}>
            Get it on
            <img src="googleplay.png" />
          </div>
        </div>
        <div className={style.footer}>
            <div className={style.contact}>Say Hello</div>
            <div className={style.links}>
              <Link href="terms">Terms of Use and Privacy Policy</Link>
              <span> © Fox & Grey LLC, 2020</span>
            </div>
          </div>
      </div>
    </>
  )
}
