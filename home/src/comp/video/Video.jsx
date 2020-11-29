import React from "react"
import style from "./video.module.css"

export default function Video() {
  return (
    <>
      <div className={style.container}>
        <div class={style.embedContainer}>
          <iframe
            src="https://www.youtube.com/embed/ENDTjt_PXVo"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </>
  )
}
