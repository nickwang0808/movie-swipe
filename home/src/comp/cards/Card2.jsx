import React from "react"
import style from "./card.module.css"

export default function Card2() {
  return (
    <div className={style.card}>
      <div className={style.center_card}>
        <svg
          width="78"
          height="78"
          viewBox="0 0 78 78"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M64.9161 57.91C66.5706 56.5894 67.8233 54.833 68.5331 52.8387H69.1936C70.1945 52.8387 71.1545 52.4411 71.8623 51.7333C72.5701 51.0255 72.9677 50.0655 72.9677 49.0645C72.9677 48.0635 72.5701 47.1036 71.8623 46.3958C71.1545 45.688 70.1945 45.2903 69.1936 45.2903H70.4516C70.7853 45.2903 71.1053 45.1578 71.3412 44.9218C71.5771 44.6859 71.7097 44.3659 71.7097 44.0323V40.2581C71.7067 37.5897 70.6453 35.0315 68.7585 33.1447C66.8717 31.2579 64.3135 30.1965 61.6452 30.1935H54.0968C53.825 30.1935 53.5571 30.2137 53.2904 30.2338C51.1695 28.7215 48.6614 27.8452 46.0603 27.7076C47.7082 26.3878 48.9555 24.6347 49.6621 22.6452H50.3226C51.3236 22.6452 52.2835 22.2475 52.9913 21.5397C53.6991 20.8319 54.0968 19.8719 54.0968 18.871C54.0968 17.87 53.6991 16.91 52.9913 16.2022C52.2835 15.4944 51.3236 15.0968 50.3226 15.0968H51.5806C51.9143 15.0968 52.2343 14.9642 52.4702 14.7283C52.7062 14.4924 52.8387 14.1724 52.8387 13.8387V10.0645C52.8357 7.39616 51.7744 4.83795 49.8876 2.95114C48.0008 1.06432 45.4425 0.00299685 42.7742 0H35.2258C32.5575 0.00299685 29.9992 1.06432 28.1124 2.95114C26.2256 4.83795 25.1643 7.39616 25.1613 10.0645V13.8387C25.1613 14.1724 25.2938 14.4924 25.5298 14.7283C25.7657 14.9642 26.0857 15.0968 26.4194 15.0968H27.6774C26.6764 15.0968 25.7165 15.4944 25.0087 16.2022C24.3009 16.91 23.9032 17.87 23.9032 18.871C23.9032 19.8719 24.3009 20.8319 25.0087 21.5397C25.7165 22.2475 26.6764 22.6452 27.6774 22.6452H28.3379C29.0445 24.6347 30.2918 26.3878 31.9397 27.7076C29.3386 27.8447 26.8307 28.7215 24.7109 30.2351C24.4429 30.2137 24.1762 30.1935 23.9032 30.1935H16.3548C13.6865 30.1965 11.1283 31.2579 9.24146 33.1447C7.35465 35.0315 6.29332 37.5897 6.29032 40.2581V44.0323C6.29032 44.3659 6.42287 44.6859 6.6588 44.9218C6.89473 45.1578 7.21473 45.2903 7.54839 45.2903H8.80645C7.80547 45.2903 6.84549 45.688 6.13769 46.3958C5.4299 47.1036 5.03226 48.0635 5.03226 49.0645C5.03226 50.0655 5.4299 51.0255 6.13769 51.7333C6.84549 52.4411 7.80547 52.8387 8.80645 52.8387H9.46694C10.1767 54.833 11.4294 56.5894 13.0839 57.91C9.55273 58.1029 6.22942 59.6403 3.79625 62.2066C1.36308 64.7729 0.00470171 68.1733 0 71.7097V76.7419C0 77.0756 0.132546 77.3956 0.368479 77.6315C0.604411 77.8675 0.924405 78 1.25806 78H76.7419C77.0756 78 77.3956 77.8675 77.6315 77.6315C77.8675 77.3956 78 77.0756 78 76.7419V71.7097C77.9953 68.1733 76.6369 64.7729 74.2038 62.2066C71.7706 59.6403 68.4473 58.1029 64.9161 57.91ZM25.1613 60.3871C25.1613 61.7217 24.6311 63.0017 23.6874 63.9454C22.7436 64.8892 21.4637 65.4194 20.129 65.4194C18.7944 65.4194 17.5144 64.8892 16.5707 63.9454C15.627 63.0017 15.0968 61.7217 15.0968 60.3871H25.1613ZM27.1742 57.91C28.8286 56.5894 30.0813 54.833 30.7911 52.8387H31.4516C32.2294 52.8355 32.9872 52.592 33.6214 52.1416C34.2555 51.6912 34.7351 51.0559 34.9943 50.3226H43.0057C43.2649 51.0559 43.7444 51.6912 44.3786 52.1416C45.0128 52.592 45.7706 52.8355 46.5484 52.8387H47.2089C47.9187 54.833 49.1714 56.5894 50.8258 57.91C48.3064 58.0489 45.8729 58.874 43.7886 60.296C41.7043 61.718 40.0484 63.6828 39 65.9779C37.9516 63.6828 36.2957 61.718 34.2114 60.296C32.1271 58.874 29.6936 58.0489 27.1742 57.91ZM31.4516 49.0645V47.8064C31.7853 47.8064 32.1053 47.939 32.3412 48.1749C32.5771 48.4109 32.7097 48.7309 32.7097 49.0645C32.7097 49.3982 32.5771 49.7182 32.3412 49.9541C32.1053 50.19 31.7853 50.3226 31.4516 50.3226H31.3774C31.4256 49.9049 31.4504 49.4849 31.4516 49.0645ZM46.6226 50.3226H46.5484C46.2147 50.3226 45.8947 50.19 45.6588 49.9541C45.4229 49.7182 45.2903 49.3982 45.2903 49.0645C45.2903 48.7309 45.4229 48.4109 45.6588 48.1749C45.8947 47.939 46.2147 47.8064 46.5484 47.8064V49.0645C46.5496 49.4849 46.5744 49.9049 46.6226 50.3226ZM62.9032 60.3871C62.9032 61.7217 62.373 63.0017 61.4293 63.9454C60.4856 64.8892 59.2056 65.4194 57.871 65.4194C56.5363 65.4194 55.2564 64.8892 54.3126 63.9454C53.3689 63.0017 52.8387 61.7217 52.8387 60.3871H62.9032ZM57.871 57.871C55.5362 57.8683 53.2978 56.9396 51.6468 55.2887C49.9959 53.6377 49.0672 51.3993 49.0645 49.0645V45.2903H66.6774V49.0645C66.6748 51.3993 65.7461 53.6377 64.0951 55.2887C62.4442 56.9396 60.2058 57.8683 57.871 57.871ZM70.4516 49.0645C70.4516 49.3982 70.3191 49.7182 70.0831 49.9541C69.8472 50.19 69.5272 50.3226 69.1936 50.3226H69.1193C69.1676 49.9049 69.1924 49.4849 69.1936 49.0645V47.8064C69.5272 47.8064 69.8472 47.939 70.0831 48.1749C70.3191 48.4109 70.4516 48.7309 70.4516 49.0645ZM61.6452 32.7097C63.6465 32.7117 65.5653 33.5076 66.9805 34.9228C68.3956 36.3379 69.1916 38.2567 69.1936 40.2581V42.7742H46.5484V40.2581C46.5504 38.2567 47.3463 36.3379 48.7615 34.9228C50.1766 33.5076 52.0954 32.7117 54.0968 32.7097H61.6452ZM44.0323 30.1935C44.0323 31.5282 43.5021 32.8082 42.5583 33.7519C41.6146 34.6956 40.3346 35.2258 39 35.2258C37.6654 35.2258 36.3854 34.6956 35.4417 33.7519C34.4979 32.8082 33.9677 31.5282 33.9677 30.1935H44.0323ZM51.5806 18.871C51.5806 19.2046 51.4481 19.5246 51.2122 19.7606C50.9762 19.9965 50.6562 20.129 50.3226 20.129H50.2484C50.2966 19.7114 50.3214 19.2914 50.3226 18.871V17.6129C50.6562 17.6129 50.9762 17.7454 51.2122 17.9814C51.4481 18.2173 51.5806 18.5373 51.5806 18.871ZM27.6774 10.0645C27.6794 8.06317 28.4753 6.14437 29.8905 4.72921C31.3057 3.31404 33.2245 2.51813 35.2258 2.51613H42.7742C44.7755 2.51813 46.6943 3.31404 48.1095 4.72921C49.5247 6.14437 50.3206 8.06317 50.3226 10.0645V12.5806H27.6774V10.0645ZM27.6774 20.129C27.3438 20.129 27.0238 19.9965 26.7878 19.7606C26.5519 19.5246 26.4194 19.2046 26.4194 18.871C26.4194 18.5373 26.5519 18.2173 26.7878 17.9814C27.0238 17.7454 27.3438 17.6129 27.6774 17.6129V18.871C27.6786 19.2914 27.7034 19.7114 27.7516 20.129H27.6774ZM30.1935 18.871V15.0968H47.8064V18.871C47.8064 21.2066 46.8786 23.4465 45.2271 25.0981C43.5756 26.7496 41.3356 27.6774 39 27.6774C36.6644 27.6774 34.4244 26.7496 32.7729 25.0981C31.1214 23.4465 30.1935 21.2066 30.1935 18.871ZM31.4516 30.2703C31.5136 32.2299 32.3356 34.0886 33.7438 35.4529C35.1519 36.8171 37.0356 37.58 38.9962 37.58C40.9569 37.58 42.8406 36.8171 44.2487 35.4529C45.6568 34.0886 46.4788 32.2299 46.5408 30.2703C47.6794 30.3934 48.7923 30.6904 49.8407 31.1509C48.1071 31.9599 46.64 33.2463 45.6112 34.8592C44.5825 36.4722 44.0348 38.345 44.0323 40.2581V44.0323C44.0323 44.3659 44.1648 44.6859 44.4007 44.9218C44.6367 45.1578 44.9567 45.2903 45.2903 45.2903H46.5484C45.7706 45.2935 45.0128 45.537 44.3786 45.9874C43.7444 46.4378 43.2649 47.0731 43.0057 47.8064H34.9943C34.7351 47.0731 34.2555 46.4378 33.6214 45.9874C32.9872 45.537 32.2294 45.2935 31.4516 45.2903H32.7097C33.0433 45.2903 33.3633 45.1578 33.5993 44.9218C33.8352 44.6859 33.9677 44.3659 33.9677 44.0323V40.2581C33.9651 38.3443 33.417 36.471 32.3875 34.8578C31.3581 33.2445 29.89 31.9582 28.1555 31.1497C29.2028 30.6899 30.3144 30.3933 31.4516 30.2703ZM8.80645 40.2581C8.80845 38.2567 9.60437 36.3379 11.0195 34.9228C12.4347 33.5076 14.3535 32.7117 16.3548 32.7097H23.9032C25.9046 32.7117 27.8234 33.5076 29.2385 34.9228C30.6537 36.3379 31.4496 38.2567 31.4516 40.2581V42.7742H8.80645V40.2581ZM8.80645 50.3226C8.47279 50.3226 8.1528 50.19 7.91687 49.9541C7.68093 49.7182 7.54839 49.3982 7.54839 49.0645C7.54839 48.7309 7.68093 48.4109 7.91687 48.1749C8.1528 47.939 8.47279 47.8064 8.80645 47.8064V49.0645C8.80765 49.4849 8.83243 49.9049 8.88068 50.3226H8.80645ZM11.3226 49.0645V45.2903H28.9355V49.0645C28.9355 51.4001 28.0077 53.6401 26.3561 55.2916C24.7046 56.9431 22.4646 57.871 20.129 57.871C17.7934 57.871 15.5535 56.9431 13.9019 55.2916C12.2504 53.6401 11.3226 51.4001 11.3226 49.0645ZM2.51613 71.7097C2.5199 68.9261 3.54781 66.2412 5.40392 64.1667C7.26004 62.0923 9.81458 60.7734 12.5806 60.4613C12.6426 62.421 13.4647 64.2796 14.8728 65.6439C16.2809 67.0082 18.1646 67.771 20.1253 67.771C22.0859 67.771 23.9696 67.0082 25.3777 65.6439C26.7858 64.2796 27.6079 62.421 27.6699 60.4613C30.4373 60.7716 32.9937 62.0898 34.8513 64.1644C36.709 66.2391 37.738 68.9249 37.7419 71.7097V75.4839H32.7097V67.9355C32.7097 67.6018 32.5771 67.2818 32.3412 67.0459C32.1053 66.81 31.7853 66.6774 31.4516 66.6774C31.118 66.6774 30.798 66.81 30.562 67.0459C30.3261 67.2818 30.1935 67.6018 30.1935 67.9355V75.4839H10.0645V67.9355C10.0645 67.6018 9.93197 67.2818 9.69604 67.0459C9.4601 66.81 9.14011 66.6774 8.80645 66.6774C8.47279 66.6774 8.1528 66.81 7.91687 67.0459C7.68093 67.2818 7.54839 67.6018 7.54839 67.9355V75.4839H2.51613V71.7097ZM75.4839 75.4839H70.4516V67.9355C70.4516 67.6018 70.3191 67.2818 70.0831 67.0459C69.8472 66.81 69.5272 66.6774 69.1936 66.6774C68.8599 66.6774 68.5399 66.81 68.304 67.0459C68.068 67.2818 67.9355 67.6018 67.9355 67.9355V75.4839H47.8064V67.9355C47.8064 67.6018 47.6739 67.2818 47.438 67.0459C47.202 66.81 46.882 66.6774 46.5484 66.6774C46.2147 66.6774 45.8947 66.81 45.6588 67.0459C45.4229 67.2818 45.2903 67.6018 45.2903 67.9355V75.4839H40.2581V71.7097C40.2618 68.9261 41.2897 66.2412 43.1459 64.1667C45.002 62.0923 47.5565 60.7734 50.3226 60.4613C50.3846 62.421 51.2066 64.2796 52.6147 65.6439C54.0229 67.0082 55.9066 67.771 57.8672 67.771C59.8278 67.771 61.7115 67.0082 63.1196 65.6439C64.5278 64.2796 65.3498 62.421 65.4118 60.4613C68.1792 60.7716 70.7356 62.0898 72.5933 64.1644C74.4509 66.2391 75.4799 68.9249 75.4839 71.7097V75.4839Z"
            fill="black"
          />
          <path
            d="M65.4194 13.8387C65.753 13.8387 66.0729 13.7061 66.3088 13.4701L71.3411 8.43788C71.4612 8.32183 71.5571 8.183 71.623 8.02952C71.6889 7.87603 71.7236 7.71094 71.7251 7.5439C71.7265 7.37685 71.6947 7.21119 71.6315 7.05658C71.5682 6.90197 71.4748 6.7615 71.3567 6.64338C71.2385 6.52526 71.0981 6.43184 70.9435 6.36859C70.7888 6.30533 70.6232 6.2735 70.4561 6.27495C70.2891 6.2764 70.124 6.31111 69.9705 6.37704C69.817 6.44297 69.6782 6.53882 69.5622 6.65897L64.5299 11.6912C64.354 11.8672 64.2342 12.0913 64.1857 12.3353C64.1372 12.5793 64.1621 12.8322 64.2573 13.0621C64.3525 13.2919 64.5137 13.4884 64.7206 13.6266C64.9274 13.7649 65.1706 13.8387 65.4194 13.8387Z"
            fill="black"
          />
          <path
            d="M60.3871 12.5806C60.7208 12.5806 61.0407 12.4481 61.2767 12.2121C61.5126 11.9762 61.6452 11.6562 61.6452 11.3226V5.03223C61.6452 4.69857 61.5126 4.37858 61.2767 4.14265C61.0407 3.90672 60.7208 3.77417 60.3871 3.77417C60.0534 3.77417 59.7334 3.90672 59.4975 4.14265C59.2616 4.37858 59.129 4.69857 59.129 5.03223V11.3226C59.129 11.6562 59.2616 11.9762 59.4975 12.2121C59.7334 12.4481 60.0534 12.5806 60.3871 12.5806Z"
            fill="black"
          />
          <path
            d="M65.4194 17.6129C65.4194 17.9466 65.5519 18.2666 65.7879 18.5025C66.0238 18.7384 66.3438 18.871 66.6774 18.871H72.9678C73.3014 18.871 73.6214 18.7384 73.8573 18.5025C74.0933 18.2666 74.2258 17.9466 74.2258 17.6129C74.2258 17.2793 74.0933 16.9593 73.8573 16.7233C73.6214 16.4874 73.3014 16.3549 72.9678 16.3549H66.6774C66.3438 16.3549 66.0238 16.4874 65.7879 16.7233C65.5519 16.9593 65.4194 17.2793 65.4194 17.6129Z"
            fill="black"
          />
          <path
            d="M11.6912 13.4701C11.9285 13.6993 12.2463 13.8261 12.5761 13.8232C12.906 13.8203 13.2215 13.688 13.4548 13.4548C13.688 13.2215 13.8203 12.906 13.8232 12.5761C13.8261 12.2463 13.6993 11.9285 13.4701 11.6912L8.43784 6.65894C8.20057 6.42977 7.88278 6.30297 7.55292 6.30583C7.22306 6.3087 6.90752 6.44101 6.67427 6.67427C6.44101 6.90752 6.3087 7.22306 6.30583 7.55292C6.30297 7.88278 6.42977 8.20057 6.65894 8.43784L11.6912 13.4701Z"
            fill="black"
          />
          <path
            d="M17.6129 12.5806C17.9466 12.5806 18.2666 12.4481 18.5025 12.2121C18.7384 11.9762 18.871 11.6562 18.871 11.3226V5.03223C18.871 4.69857 18.7384 4.37858 18.5025 4.14265C18.2666 3.90672 17.9466 3.77417 17.6129 3.77417C17.2793 3.77417 16.9593 3.90672 16.7233 4.14265C16.4874 4.37858 16.3549 4.69857 16.3549 5.03223V11.3226C16.3549 11.6562 16.4874 11.9762 16.7233 12.2121C16.9593 12.4481 17.2793 12.5806 17.6129 12.5806Z"
            fill="black"
          />
          <path
            d="M5.03223 18.871H11.3226C11.6562 18.871 11.9762 18.7384 12.2121 18.5025C12.4481 18.2666 12.5806 17.9466 12.5806 17.6129C12.5806 17.2793 12.4481 16.9593 12.2121 16.7233C11.9762 16.4874 11.6562 16.3549 11.3226 16.3549H5.03223C4.69857 16.3549 4.37858 16.4874 4.14265 16.7233C3.90672 16.9593 3.77417 17.2793 3.77417 17.6129C3.77417 17.9466 3.90672 18.2666 4.14265 18.5025C4.37858 18.7384 4.69857 18.871 5.03223 18.871Z"
            fill="black"
          />
        </svg>
      </div>
      <h3>Your friends do the same</h3>
    </div>
  )
}