import React from "react";
import styled from "styled-components/macro";

const LogoWrapper = styled.div`
  position: absolute;
  left: calc(50% - 75px);
  padding-top: 1.8rem;
  fill: linear-gradient(266.71deg, #29323c 11.43%, #485563 89.74%);
`;

export default function FilterButton() {
  return (
    <LogoWrapper>
      <svg
        width="148"
        height="32"
        viewBox="0 0 148 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M64.5288 16.6586C65.2105 14.0271 66.2655 8.47352 69.4467 5.29311C70.5829 4.16302 71.7028 3.54954 72.6767 3.2428C72.3683 3.45267 72.0599 3.67869 71.7678 3.937C68.4404 6.89139 67.9048 12.4289 69.7876 17.8049C69.1059 19.0157 68.0509 20.0005 66.2655 20.6301C64.4963 21.2274 62.1428 22.1799 60.2276 22.3091C62.4188 21.4535 63.8633 19.2578 64.5288 16.6586Z"
          fill="black"
        />
        <path
          d="M58.994 13.9948C59.5296 17.4013 60.325 19.4031 62.3376 20.1942C61.6397 21.0821 60.8119 21.7763 59.8218 22.1961C54.9038 21.9378 54.3358 15.9321 54.2871 11.8154C54.4169 11.8477 58.994 13.9948 58.994 13.9948Z"
          fill="black"
        />
        <path
          d="M89.784 4.79264C87.1059 2.38715 82.5937 0.0139532 78.325 0.998749C78.0329 1.06333 77.9192 0.659721 78.1789 0.562856C81.8147 -0.825546 86.5216 0.38527 90.5956 3.85627C90.7092 3.95314 90.7741 4.08229 90.8066 4.22759L90.8066 4.24374C90.8877 4.80878 90.2223 5.14781 89.784 4.79264Z"
          fill="black"
        />
        <path
          d="M72.417 3.95317C77.1889 -0.308897 85.7751 2.16117 91.2611 10.0395C91.3747 13.3491 91.2449 16.6587 90.8391 18.9027C90.6119 20.1458 92.024 20.8723 92.8355 20.1942C93.7607 19.4355 94.4099 18.822 94.4099 18.822C94.9455 20.5333 95.1403 22.0508 95.0591 23.3908C94.7508 25.538 93.923 27.3946 92.6407 28.7668C92.024 29.3803 91.3098 29.9131 90.547 30.3651C90.1736 30.5588 89.7679 30.7364 89.3459 30.8817C83.8761 32.7221 76.6695 28.7507 72.5794 22.2284C68.4729 15.7223 68.1808 7.73091 72.417 3.95317ZM86.5217 22.8903C86.7327 24.198 87.9013 25.4734 89.1511 25.764C90.4496 26.0546 91.3747 25.1989 91.1962 23.8267C91.0176 22.4383 89.7679 21.1145 88.4532 20.8723C87.1547 20.6463 86.3107 21.5665 86.5217 22.8903ZM86.6191 15.7869C87.8526 16.6587 89.2809 16.4488 89.8003 15.2541C90.3197 14.0272 89.6867 12.2997 88.372 11.4118C87.0735 10.54 85.6615 10.8629 85.207 12.0899C84.7688 13.2845 85.4018 14.9312 86.6191 15.7869ZM80.8409 26.7649C81.5713 27.9273 82.8373 28.5892 83.6975 28.2502C84.574 27.895 84.6876 26.6196 83.9247 25.4088C83.1619 24.198 81.8472 23.5522 81.0032 23.9558C80.1754 24.3594 80.1105 25.6025 80.8409 26.7649ZM80.5 18.4991C81.1168 18.9673 81.7985 18.8704 82.0095 18.2731C82.2205 17.6757 81.8797 16.804 81.2467 16.3358C80.6136 15.8676 79.9319 15.9967 79.7372 16.5941C79.5424 17.1914 79.8833 18.0309 80.5 18.4991ZM80.6786 10.201C81.6037 9.57135 81.7011 7.95693 80.8571 6.61697C80.0293 5.29314 78.6172 4.79267 77.7245 5.48687C76.8643 6.16493 76.8318 7.73091 77.6272 9.00631C78.4225 10.2817 79.7859 10.8306 80.6786 10.201ZM74.8192 22.1961C75.7931 22.971 76.8156 22.858 77.124 21.9378C77.4324 20.9853 76.8481 19.5646 75.8418 18.7897C74.8354 18.0148 73.8129 18.1924 73.5532 19.1449C73.2935 20.0651 73.8616 21.4212 74.8192 22.1961ZM74.0564 14.2693C75.0789 14.4146 75.7119 13.4621 75.4522 12.1383C75.1763 10.7983 74.1051 9.61979 73.0663 9.53907C72.06 9.4422 71.4757 10.427 71.7516 11.7185C72.0437 13.0101 73.05 14.1402 74.0564 14.2693Z"
          fill="black"
        />
        <path
          d="M89.8165 31.5598C94.5559 29.3964 97.6236 24.8922 94.5884 17.708C94.5884 17.708 93.4522 18.709 92.4784 19.5646C92.0726 19.9198 91.4396 19.5808 91.5045 19.048C91.9428 15.916 92.3323 10.4754 91.7318 5.90662C91.6668 5.47073 92.1213 5.1317 92.5271 5.29314C95.5947 6.5201 99.409 8.68342 101.292 10.5884C101.519 10.8145 101.503 11.2019 101.259 11.4279C100.659 11.9768 99.6849 12.8325 99.6849 12.8325C103.077 20.0328 97.9807 30.3974 89.9626 31.9957C89.7029 32.0441 89.5731 31.6728 89.8165 31.5598Z"
          fill="#111111"
        />
        <path
          d="M0 24.8001V7.20988H3.30212L5.78118 20.0627L8.1115 7.20988H11.4335V24.8001H9.06346V18.2438L9.16263 12.2271L6.81247 24.7202H4.70031L2.25099 12.2271L2.35015 18.2438V24.8001H0Z"
          fill="black"
        />
        <path
          d="M16.5205 19.9128C16.5205 20.9456 16.5965 21.6652 16.7486 22.0716C16.9072 22.4781 17.2279 22.6813 17.7104 22.6813C18.193 22.6813 18.5104 22.4747 18.6624 22.0616C18.8145 21.6419 18.8905 20.9256 18.8905 19.9128V11.7174C18.8905 10.8845 18.8112 10.2782 18.6525 9.89839C18.5004 9.51194 18.1963 9.31871 17.7402 9.31871C17.2907 9.31871 16.9733 9.51194 16.7882 9.89839C16.6097 10.2782 16.5205 10.8812 16.5205 11.7074V19.9128ZM21.558 19.8828C21.558 21.6019 21.2539 22.8845 20.6457 23.7307C20.0375 24.5769 19.0624 25 17.7204 25C16.385 25 15.4033 24.5769 14.7752 23.7307C14.1538 22.8778 13.8431 21.5952 13.8431 19.8828V11.8373C13.8431 8.61244 15.1487 7 17.76 7C19.1086 7 20.0771 7.40977 20.6655 8.22932C21.2605 9.04886 21.558 10.2515 21.558 11.8373V19.8828Z"
          fill="black"
        />
        <path
          d="M25.931 24.8001L23.2239 7.20988H25.7525L26.8929 15.1555L27.597 20.7524H27.6664L28.2713 15.1555L29.2232 7.20988H31.7023L29.2133 24.8001H25.931Z"
          fill="black"
        />
        <path
          d="M33.6558 24.8001V7.20988H36.3134V24.8001H33.6558Z"
          fill="black"
        />
        <path
          d="M39.0304 24.8001V7.20988H44.881V9.5186H41.688V14.6358H44.7223V16.8945H41.688V22.4914H45V24.8001H39.0304Z"
          fill="black"
        />
        <path
          d="M112.02 19.8529V18.2837H114.547V20.0527C114.547 21.0322 114.63 21.7218 114.796 22.1216C114.962 22.5147 115.274 22.7113 115.731 22.7113C116.189 22.7113 116.491 22.548 116.637 22.2215C116.789 21.8951 116.866 21.362 116.866 20.6224C116.866 19.8828 116.733 19.2399 116.468 18.6935C116.202 18.1405 115.781 17.5641 115.204 16.9645L113.91 15.6252C113.307 14.9922 112.836 14.3359 112.498 13.6563C112.166 12.9767 112 12.1904 112 11.2976C112 9.84509 112.279 8.76569 112.836 8.05941C113.393 7.35314 114.352 7 115.711 7C117.071 7 117.99 7.4131 118.468 8.23931C118.952 9.05886 119.194 10.2582 119.194 11.8373V12.9267H116.736V11.6674C116.736 10.8145 116.663 10.2049 116.517 9.83842C116.371 9.4653 116.09 9.27873 115.672 9.27873C115.26 9.27873 114.962 9.41866 114.776 9.6985C114.597 9.97835 114.507 10.3981 114.507 10.9578C114.507 11.5175 114.6 11.9639 114.786 12.2971C114.972 12.6302 115.307 13.0566 115.791 13.5763L117.234 15.1455C117.957 15.9317 118.501 16.7279 118.866 17.5341C119.237 18.3404 119.423 19.2199 119.423 20.1727C119.423 21.8184 119.148 23.0344 118.597 23.8207C118.046 24.6069 117.081 25 115.701 25C114.328 25 113.37 24.5636 112.826 23.6907C112.289 22.8112 112.02 21.5319 112.02 19.8529Z"
          fill="black"
        />
        <path
          d="M123.095 24.8001V17.774L120.159 7.20988H122.706L124.438 13.7862H124.478L126.02 7.20988H128.557L125.761 17.774V24.8001H123.095Z"
          fill="black"
        />
        <path
          d="M129.96 24.8001V7.20988H132.05L135.761 17.764L135.572 12.9667V7.20988H137.97V24.8001H136.08L132.269 13.8762L132.418 18.4936V24.8001H129.96Z"
          fill="black"
        />
        <path
          d="M148 20.0028C148 21.7018 147.698 22.9611 147.095 23.7807C146.491 24.5936 145.542 25 144.249 25C142.955 25 141.987 24.5669 141.343 23.7007C140.706 22.8279 140.388 21.5752 140.388 19.9428V12.2771C140.388 9.65852 141.071 8.02277 142.438 7.36979C142.942 7.12993 143.552 7.00999 144.269 7.00999C146.73 7.00999 147.96 8.56913 147.96 11.6874V14.1061H145.383V11.8573C145.383 10.9511 145.307 10.3048 145.154 9.91838C145.002 9.52526 144.703 9.32871 144.259 9.32871C143.814 9.32871 143.506 9.53526 143.333 9.94836C143.161 10.3615 143.075 10.9944 143.075 11.8473V20.0627C143.075 21.0089 143.158 21.6852 143.323 22.0916C143.489 22.4981 143.791 22.7013 144.229 22.7013C144.667 22.7013 144.968 22.4947 145.134 22.0816C145.3 21.6685 145.383 20.9856 145.383 20.0328V17.5142H148V20.0028Z"
          fill="black"
        />
      </svg>
    </LogoWrapper>
  );
}
