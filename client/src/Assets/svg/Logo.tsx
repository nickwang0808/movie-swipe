import React from "react";
import styled from "styled-components/macro";

const LogoWrapper = styled.div`
  position: absolute;
  left: 2rem;
  padding-top: 1.8rem;
  fill: linear-gradient(266.71deg, #29323c 11.43%, #485563 89.74%);
`;

export default function Logo() {
  return (
    <LogoWrapper>
      <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5288 16.6586C11.2105 14.0271 12.2656 8.47352 15.4468 5.29311C16.583 4.16302 17.7029 3.54954 18.6768 3.2428C18.3684 3.45267 18.06 3.67869 17.7678 3.937C14.4405 6.89139 13.9049 12.4289 15.7877 17.8049C15.106 19.0157 14.051 20.0005 12.2656 20.6301C10.4964 21.2274 8.14291 22.1799 6.22766 22.3091C8.41883 21.4535 9.86338 19.2578 10.5288 16.6586Z" fill="black"/>
<path d="M4.99408 13.9948C5.5297 17.4013 6.32502 19.4031 8.33765 20.1942C7.63972 21.0821 6.81194 21.7763 5.82186 22.1961C0.903898 21.9378 0.335816 15.9321 0.287124 11.8154C0.416971 11.8477 4.99408 13.9948 4.99408 13.9948Z" fill="black"/>
<path d="M35.7839 4.79264C33.1058 2.38715 28.5936 0.0139532 24.3249 0.998749C24.0327 1.06333 23.9191 0.659721 24.1788 0.562856C27.8145 -0.825546 32.5215 0.38527 36.5954 3.85627C36.7091 3.95314 36.774 4.08229 36.8065 4.22759L36.8065 4.24374C36.8876 4.80878 36.2221 5.14781 35.7839 4.79264Z" fill="black"/>
<path d="M18.4171 3.95317C23.189 -0.308897 31.7751 2.16117 37.2612 10.0395C37.3748 13.3491 37.2449 16.6587 36.8392 18.9027C36.6119 20.1458 38.024 20.8723 38.8356 20.1942C39.7607 19.4355 40.41 18.822 40.41 18.822C40.9456 20.5333 41.1404 22.0508 41.0592 23.3908C40.7508 25.538 39.923 27.3946 38.6408 28.7668C38.024 29.3803 37.3099 29.9131 36.547 30.3651C36.1737 30.5588 35.7679 30.7364 35.3459 30.8817C29.8761 32.7221 22.6696 28.7507 18.5794 22.2284C14.473 15.7223 14.1808 7.73091 18.4171 3.95317ZM32.5218 22.8903C32.7328 24.198 33.9014 25.4734 35.1512 25.764C36.4496 26.0546 37.3748 25.1989 37.1962 23.8267C37.0177 22.4383 35.7679 21.1145 34.4532 20.8723C33.1548 20.6463 32.3108 21.5665 32.5218 22.8903ZM32.6191 15.7869C33.8527 16.6587 35.281 16.4488 35.8004 15.2541C36.3198 14.0272 35.6868 12.2997 34.3721 11.4118C33.0736 10.54 31.6615 10.8629 31.2071 12.0899C30.7688 13.2845 31.4018 14.9312 32.6191 15.7869ZM26.8409 26.7649C27.5713 27.9273 28.8373 28.5892 29.6976 28.2502C30.574 27.895 30.6877 26.6196 29.9248 25.4088C29.162 24.198 27.8473 23.5522 27.0032 23.9558C26.1755 24.3594 26.1105 25.6025 26.8409 26.7649ZM26.5001 18.4991C27.1169 18.9673 27.7986 18.8704 28.0096 18.2731C28.2206 17.6757 27.8797 16.804 27.2467 16.3358C26.6137 15.8676 25.932 15.9967 25.7372 16.5941C25.5425 17.1914 25.8833 18.0309 26.5001 18.4991ZM26.6786 10.201C27.6038 9.57135 27.7012 7.95693 26.8572 6.61697C26.0294 5.29314 24.6173 4.79267 23.7246 5.48687C22.8644 6.16493 22.8319 7.73091 23.6272 9.00631C24.4225 10.2817 25.7859 10.8306 26.6786 10.201ZM20.8193 22.1961C21.7931 22.971 22.8157 22.858 23.1241 21.9378C23.4325 20.9853 22.8481 19.5646 21.8418 18.7897C20.8355 18.0148 19.813 18.1924 19.5533 19.1449C19.2936 20.0651 19.8617 21.4212 20.8193 22.1961ZM20.0564 14.2693C21.079 14.4146 21.712 13.4621 21.4523 12.1383C21.1764 10.7983 20.1051 9.61979 19.0663 9.53907C18.06 9.4422 17.4757 10.427 17.7516 11.7185C18.0438 13.0101 19.0501 14.1402 20.0564 14.2693Z" fill="black"/>
<path d="M35.8164 31.5598C40.5558 29.3964 43.6235 24.8922 40.5883 17.708C40.5883 17.708 39.4521 18.709 38.4783 19.5646C38.0725 19.9198 37.4395 19.5808 37.5044 19.048C37.9426 15.916 38.3322 10.4754 37.7316 5.90662C37.6667 5.47073 38.1212 5.1317 38.527 5.29314C41.5946 6.5201 45.4089 8.68342 47.2916 10.5884C47.5189 10.8145 47.5026 11.2019 47.2592 11.4279C46.6586 11.9768 45.6848 12.8325 45.6848 12.8325C49.077 20.0328 43.9805 30.3974 35.9625 31.9957C35.7028 32.0441 35.5729 31.6728 35.8164 31.5598Z" fill="#111111"/>
</svg>

    </LogoWrapper>
  );
}