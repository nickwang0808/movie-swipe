import React, { useEffect, useState } from "react";
import style from "./intro.module.css";
import sharedStyle from "../ButtonComps/ButtonComps.module.css";
import Logo from "../Decorators/Logo";
import { motion } from "framer-motion";
import { auth } from "../../firebase/config";
import { Link, Route } from "react-router-dom";
import { IPopularMovies } from "../../db-operations/useGetMovies";
import baseUrl from "../../HelperFunctions/ImgBaseUrl";

export default function Onboarding_01() {
  const [posters, setPosters] = useState<string[]>();

  const anonymousSignIn = () => {
    auth.signInAnonymously().catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  };

  const fetchPopularMovies = async () => {
    const REACT_APP_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${REACT_APP_TMDB_KEY}&language=en-US`;
    const response: IPopularMovies = await fetch(url).then((res) => res.json());
    setPosters(response.results.slice(0, 3).map((elem) => elem.poster_path));
    return response;
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <>
      <motion.div className="background_container">
        <div className="background" />
      </motion.div>
      <div className={style.container_onboarding}>
        <motion.div
          animate={{ opacity: 1, paddingTop: "0rem" }}
          initial={{ opacity: 0, paddingTop: "3rem" }}
          transition={{
            duration: 0.75,
          }}
          className="container_header"
        >
          <Logo />
        </motion.div>
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{
            duration: 0.75,
          }}
          className={style.container_centercontent}
        >
          <div className={style.container_posters}>
            <div className={style.thumbUpdemo}>
              <motion.div
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.9, 1, 0.9],
                  translateX: ["-50%", "20%", "-50%"],
                }}
                transition={{
                  duration: 1,
                  times: [0, 1, 2],
                  ease: [0.85, 0, 0.15, 1],
                  repeatType: "reverse",
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className={`${style.onboarding_voted_thumb} ${style.onboarding_thumb_up}`}
              >
                <svg
                  width={128}
                  height={128}
                  viewBox="0 0 24 24"
                  fill="var(--positive)"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.4613 9.08947H14.5385L15.4837 2.56529C15.6798 1.21208 14.629 0 13.2633 0C12.3496 0 11.535 0.546039 11.188 1.39105C9.98427 4.32243 8.624 7.63423 6.50747 9.08947H0.752962C0.337139 9.08947 0 9.42661 0 9.84244V20.9738C0 22.6425 1.35759 24 3.02625 24H6.73299C7.14881 24 7.48595 23.6629 7.48595 23.2471V22.8537C9.04025 23.9374 9.05131 24 9.36675 24H17.5021C18.9249 24 20.2522 23.2355 20.966 22.0047L22.4911 19.3754C23.0702 18.3768 23.3763 17.2389 23.3763 16.0846V12.0045C23.3763 10.3971 22.0686 9.08947 20.4613 9.08947ZM5.97998 22.4941H3.02625C2.18797 22.4941 1.50592 21.8121 1.50592 20.9738V10.5954H5.97998V22.4941ZM21.8703 16.0845C21.8703 16.9738 21.6345 17.8505 21.1883 18.6199L19.6634 21.2492C19.218 22.0171 18.3898 22.4941 17.5021 22.4941H9.60327L7.4859 21.0179V10.2423C9.89599 8.5015 11.3189 5.03666 12.5811 1.96311C12.6951 1.68541 12.9629 1.50592 13.2633 1.50592C13.7111 1.50592 14.0582 1.90146 13.9933 2.34934L12.9234 9.73443C12.8578 10.1871 13.2087 10.5954 13.6685 10.5954H20.4613C21.2382 10.5954 21.8703 11.2275 21.8703 12.0044V16.0845Z" />
                </svg>
              </motion.div>
            </div>
            <div className={style.thumbDowndemo}>
              <motion.div
                animate={{
                  opacity: [1, 0, 1],
                  scale: [1, 0.9, 1],
                  translateX: ["-120%", "-50%", "-120%"],
                }}
                transition={{
                  duration: 1,
                  times: [0, 1, 2],
                  ease: [0.85, 0, 0.15, 1],
                  repeatType: "reverse",
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className={`${style.onboarding_voted_thumb}  ${style.onboarding_thumb_down}`}
              >
                <svg
                  width="126"
                  height="130"
                  viewBox="0 0 126 130"
                  fill="var(--negative)"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M54.6389 129.1C59.5524 129.1 63.9332 126.163 65.7994 121.619C69.0099 113.801 72.4265 105.482 76.4505 98.1479C80.469 90.8236 85.0876 84.492 90.7009 80.6229L121.36 80.6229C123.633 80.6229 125.476 78.7801 125.476 76.5072L125.476 17.14C125.476 8.18528 118.191 0.90004 109.236 0.900041L89.4671 0.900043C87.1941 0.900043 85.3513 2.74289 85.3513 5.01583L85.3513 6.92217C83.7889 5.83214 82.5234 4.93885 81.4868 4.20706C79.8446 3.04784 78.7766 2.29392 78.012 1.80528C77.3795 1.40111 76.9468 1.17316 76.5628 1.0475C76.1762 0.920979 75.8447 0.900044 75.4203 0.900044L32.0318 0.900048C24.408 0.900049 17.296 4.99681 13.4711 11.5917L5.33765 25.6146C2.24017 30.9555 0.602851 37.0417 0.602852 43.2158L0.602854 64.9761C0.603106 73.604 7.62204 80.623 16.2497 80.623L47.7224 80.623L42.6979 115.304C41.6433 122.582 47.2941 129.1 54.6389 129.1ZM58.1847 118.492C57.592 119.936 56.2004 120.868 54.6389 120.868C52.311 120.868 50.507 118.813 50.8446 116.485L56.5507 77.0975C56.9093 74.6232 54.9912 72.3916 52.4777 72.3916L16.2497 72.3916C12.1612 72.3916 8.83468 69.0651 8.83468 64.9766L8.83468 43.216C8.83468 38.4908 10.0877 33.8324 12.4585 29.7445L20.5917 15.7217C22.9492 11.6569 27.3331 9.13162 32.032 9.13162L74.1275 9.13162L85.3515 16.957L85.3515 74.3234C78.927 78.9778 73.8204 85.9201 69.4812 93.7383C65.1329 101.573 61.5509 110.295 58.1858 118.489L58.1858 118.49L58.1857 118.49L58.1847 118.492ZM117.245 17.1403L117.245 72.3914L93.5831 72.3914L93.5831 9.13188L109.236 9.13188C113.652 9.13188 117.245 12.7244 117.245 17.1403ZM105.4 65.0999C107.899 65.0999 109.924 63.0748 109.924 60.5767C109.924 58.0786 107.899 56.0535 105.4 56.0535C102.902 56.0535 100.877 58.0786 100.877 60.5767C100.877 63.0748 102.902 65.0999 105.4 65.0999Z"
                  />
                </svg>
              </motion.div>
            </div>
            <motion.div
              style={{
                backgroundImage: `url(${posters && baseUrl + posters[0]})`,
              }}
              animate={{ rotate: 15, left: 70 }}
              initial={{ rotate: -15, left: -70 }}
              transition={{
                duration: 1,
                ease: [0.76, 0, 0.24, 1],
                repeatType: "reverse",
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className={`${style.onboarding_card} ${style.onboarding_card_1}`}
            ></motion.div>
            <div
              style={{
                backgroundImage: `url(${posters && baseUrl + posters[1]})`,
              }}
              className={`${style.onboarding_card} ${style.onboarding_card_2}`}
            ></div>
            <div
              style={{
                backgroundImage: `url(${posters && baseUrl + posters[2]})`,
              }}
              className={`${style.onboarding_card} ${style.onboarding_card_3}`}
            ></div>
          </div>
          <Route exact path="/onboard">
            <div className={`${style.container_text} ${"heavy"} `}>
              <p>
                MovieSync helps you and your friends find new movies to watch
                together...finally.
              </p>
            </div>
          </Route>
          <Route path="/onboard/2">
            <div className={`${style.container_text} ${"heavy"} `}>
              <p>
                Swipe right to like, or left to dislike. When you and your
                friends match movies, we’ll let you know!
              </p>
            </div>
          </Route>
        </motion.div>
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{
            duration: 0.75,
          }}
          className={style.container_buttons}
        >
          <Route exact path="/onboard">
            <Link
              to="/onboard/2"
              className={`${sharedStyle.btn} ${style.onboarding_btn} `}
            >
              Got It!
            </Link>
          </Route>
          <Route path="/onboard/2">
            <div
              onClick={anonymousSignIn}
              className={`${sharedStyle.btn} ${style.onboarding_btn} `}
            >
              Start Swiping
            </div>
          </Route>
          <Link to="/auth" className={style.onboarding_hyperlink}>
            Register / Sign In
          </Link>
        </motion.div>
      </div>
    </>
  );
}
