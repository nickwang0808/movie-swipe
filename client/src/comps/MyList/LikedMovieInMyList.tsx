import React from "react";
import style from "./LikedMovieInMylist.module.css";

// mock version
export default function LikedMovieInMyList() {
  const matched = true;
  return (
    <>
      <div className={style.flex_row}>
        <img
          className={style.poster}
          src="https://m.media-amazon.com/images/M/MV5BNzY3YTUwYTQtNjkwNy00OTAyLWE0OWEtYmE3MGIyOWZkODY1XkEyXkFqcGdeQXVyMjkyNzYwMTc@._V1_UX182_CR0,0,182,268_AL_.jpg"
          alt="img"
        />
        <div className={style.info_box}>
          {matched && <div>matched</div>}
          <h2>Movie Title</h2>
          <p>PG-13 | 2h 3min | Adventure, Crime, Drama | 2020 (USA)</p>
          <div>6.7 *</div>
        </div>
      </div>
    </>
  );
}

// dynamic data version below

// interface ILikedMovieProps {
//   imgUrl: string;
//   movieTitle: string;
//   movieInfo: string;
//   rating: string | number;
// }

// export default function LikedMovieInMyList({}) {
//   const matched = true;
//   return (
//     <>
//       <div className={style.flex_row}>
//         <img
//           className={style.poster}
//           src="https://m.media-amazon.com/images/M/MV5BNzY3YTUwYTQtNjkwNy00OTAyLWE0OWEtYmE3MGIyOWZkODY1XkEyXkFqcGdeQXVyMjkyNzYwMTc@._V1_UX182_CR0,0,182,268_AL_.jpg"
//           alt="img"
//         />
//         <div className={style.info_box}>
//           {matched && <div>matched</div>}
//           <h2>Movie Title</h2>
//           <p>PG-13 | 2h 3min | Adventure, Crime, Drama | 2020 (USA)</p>
//           <div>6.7 *</div>
//         </div>
//       </div>
//     </>
//   );
// }
