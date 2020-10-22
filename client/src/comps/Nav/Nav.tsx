import React from "react";
import { Link } from "react-router-dom";
import style from "./nav.module.css";

export default function Nav() {
  return (
    <div className="container_nav" style={{ zIndex: 999 }}>
      <Link className={style.link} to="/mylist">
        <div className="nav_item">
          <svg
            className="nav_icon list"
            width={25}
            height={26}
            viewBox="0 0 25 26"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21.4613 10.0895H15.5385L16.4837 3.56529C16.6798 2.21208 15.629 1 14.2633 1C13.3496 1 12.535 1.54604 12.188 2.39105C10.9843 5.32242 9.624 8.63423 7.50747 10.0895H1.75296C1.33714 10.0895 1 10.4266 1 10.8424V21.9738C1 23.6425 2.35759 25 4.02625 25H7.73299C8.14881 25 8.48595 24.6629 8.48595 24.2471V23.8537C10.0402 24.9374 10.0513 25 10.3668 25H18.5021C19.9249 25 21.2522 24.2355 21.966 23.0047L23.4911 20.3754C24.0702 19.3768 24.3763 18.2389 24.3763 17.0846V13.0045C24.3763 11.3971 23.0686 10.0895 21.4613 10.0895ZM6.97998 23.4941H4.02625C3.18797 23.4941 2.50592 22.8121 2.50592 21.9738V11.5954H6.97998V23.4941ZM22.8703 17.0845C22.8703 17.9738 22.6345 18.8505 22.1883 19.6199L20.6634 22.2492C20.218 23.0171 19.3898 23.4941 18.5021 23.4941H10.6033L8.4859 22.0179V11.2423C10.896 9.5015 12.3189 6.03666 13.5811 2.96311C13.6951 2.68541 13.9629 2.50592 14.2633 2.50592C14.7111 2.50592 15.0582 2.90146 14.9933 3.34934L13.9234 10.7344C13.8578 11.1871 14.2087 11.5954 14.6685 11.5954H21.4613C22.2382 11.5954 22.8703 12.2275 22.8703 13.0044V17.0845Z" />
            <path
              d="M4.74548 14.6587C5.20351 14.6587 5.57482 14.2874 5.57482
      13.8293C5.57482 13.3713 5.20351 13 4.74548 13C4.28745 13 3.91614
      13.3713 3.91614 13.8293C3.91614 14.2874 4.28745 14.6587 4.74548
      14.6587Z"
            />
          </svg>
          <br />
          My List
        </div>
      </Link>
      <Link className={style.link} to="/">
        <div className="nav_item">
          <svg
            className="nav_icon find"
            width={30}
            height={26}
            viewBox="0 0 30 26"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M29.1211 20.8H23.7305C25.4414 18.564 26.3672 15.8484 26.3672 13C26.3672 5.81244 20.4727 0 13.1836 0C5.89453 0 0 5.81244 0 13C0 20.1876 5.89453 26 13.1836 26H29.1211C29.6074 26 30 25.6129 30 25.1333V21.6667C30 21.1871 29.6074 20.8 29.1211 20.8ZM1.75781 13C1.75781 6.78889 6.88477 1.73333 13.1836 1.73333C19.4824 1.73333 24.6094 6.78889 24.6094 13C24.6094 19.2111 19.4824 24.2667 13.1836 24.2667C6.88477 24.2667 1.75781 19.2111 1.75781 13ZM28.2422 24.2667H19.7695C20.6191 23.7813 21.4102 23.2036 22.1426 22.5333H28.2363V24.2667H28.2422Z" />
            <path d="M21.6386 15.5133L16.7695 13.5258C16.3183 13.3409 15.8086 13.5546 15.6211 13.9938C15.3574 14.6235 14.8359 15.1378 14.1914 15.4035C13.7461 15.5884 13.5293 16.0911 13.7168 16.536L15.7324 21.3373C15.8203 21.5511 15.9902 21.7187 16.207 21.8053C16.4179 21.892 16.664 21.892 16.8808 21.8053C19.2304 20.8404 21.1347 18.9627 22.1132 16.6458C22.2011 16.432 22.2011 16.1951 22.1132 15.9813C22.0254 15.7733 21.8554 15.6058 21.6386 15.5133ZM17.0039 19.8293L15.6445 16.5938C16.1074 16.2818 16.5117 15.8889 16.8281 15.4267L20.1093 16.7671C19.3886 18.0498 18.3047 19.1187 17.0039 19.8293Z" />
            <path d="M12.1758 15.4035C11.5372 15.1435 11.0157 14.6293 10.7462 13.9938C10.5587 13.5546 10.0489 13.3409 9.59772 13.5258L4.72858 15.5133C4.51178 15.6 4.34186 15.7675 4.25397 15.9813C4.16608 16.1951 4.16608 16.432 4.25397 16.6458C5.23248 18.9627 7.13678 20.8404 9.48639 21.8053C9.69733 21.892 9.94342 21.892 10.1602 21.8053C10.377 21.7187 10.5469 21.5511 10.6348 21.3373L12.6505 16.536C12.838 16.0911 12.6212 15.5884 12.1758 15.4035ZM9.36334 19.8293C8.06256 19.1187 6.97858 18.0498 6.25787 16.7671L9.53912 15.4267C9.85553 15.8831 10.254 16.2818 10.7227 16.5938L9.36334 19.8293Z" />
            <path d="M4.72858 10.4866L9.59772 12.4742C10.0489 12.6591 10.5587 12.4453 10.7462 12.0062C11.0098 11.3764 11.5313 10.8622 12.1758 10.5964C12.6212 10.4115 12.838 9.90886 12.6505 9.46397L10.6348 4.66264C10.5469 4.44886 10.377 4.28131 10.1602 4.19464C9.94342 4.10797 9.70319 4.10797 9.48639 4.19464C7.13678 5.15953 5.23248 7.03731 4.25397 9.35419C4.16608 9.56797 4.16608 9.80486 4.25397 10.0186C4.34186 10.2324 4.51178 10.3942 4.72858 10.4866ZM9.36334 6.17064L10.7227 9.4062C10.2598 9.7182 9.85553 10.1111 9.53912 10.5733L6.25787 9.23286C6.97858 7.95019 8.06256 6.88131 9.36334 6.17064Z" />
            <path d="M13.1836 13.8666C13.669 13.8666 14.0625 13.4786 14.0625 13C14.0625 12.5213 13.669 12.1333 13.1836 12.1333C12.6982 12.1333 12.3047 12.5213 12.3047 13C12.3047 13.4786 12.6982 13.8666 13.1836 13.8666Z" />
            <path d="M14.1914 10.5964C14.83 10.8564 15.3515 11.3706 15.6211 12.0062C15.8086 12.4453 16.3183 12.6591 16.7695 12.4742L21.6386 10.4866C21.8554 10.4 22.0254 10.2324 22.1132 10.0186C22.2011 9.80486 22.2011 9.56797 22.1132 9.35419C21.1347 7.03731 19.2304 5.15953 16.8808 4.19464C16.664 4.10797 16.4238 4.10797 16.207 4.19464C15.9902 4.28131 15.8203 4.44886 15.7324 4.66264L13.7168 9.46397C13.5293 9.90886 13.7461 10.4115 14.1914 10.5964ZM17.0039 6.17064C18.3047 6.88131 19.3886 7.95019 20.1093 9.23286L16.8281 10.5733C16.5117 10.1169 16.1132 9.7182 15.6445 9.4062L17.0039 6.17064Z" />
          </svg>
          <br />
          Find Media
        </div>
      </Link>
      <Link to="/settings" className={style.link}>
        <div className="nav_item">
          <svg
            className="nav_icon settings"
            width={26}
            height={26}
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.26727 19.1165L4.86831 19.7175L4.26727 19.1165C3.74006 19.6437 3.74006 20.4984 4.26727 21.0257L4.97438 21.7328C5.50159 22.26 6.35636 22.26 6.88357 21.7328L8.18784 20.4285C9.07736 21.0058 10.0777 21.428 11.15 21.6562V23.5C11.15 24.2456 11.7544 24.85 12.5 24.85H13.5C14.2456 24.85 14.85 24.2456 14.85 23.5V21.6562C15.9224 21.428 16.9227 21.0058 17.8123 20.4284L19.1165 21.7327C19.6438 22.2599 20.4985 22.2599 21.0257 21.7327L21.7328 21.0256C22.26 20.4984 22.26 19.6436 21.7328 19.1164L20.4285 17.8121C21.0058 16.9226 21.428 15.9223 21.6562 14.85H23.5C24.2456 14.85 24.85 14.2456 24.85 13.5V12.5C24.85 11.7544 24.2456 11.15 23.5 11.15H21.6562C21.428 10.0776 21.0058 9.07733 20.4285 8.18781L21.7327 6.88352C22.26 6.35631 22.26 5.50154 21.7327 4.97433L21.0256 4.26722L20.4246 4.86826L21.0256 4.26722C20.4984 3.74001 19.6437 3.74002 19.1165 4.26722L17.8122 5.57152C16.9226 4.99422 15.9223 4.572 14.85 4.34384V2.5C14.85 1.75442 14.2456 1.15 13.5 1.15H12.5C11.7544 1.15 11.15 1.75441 11.15 2.5V4.34384C10.0777 4.57201 9.07735 4.99423 8.18782 5.57153L6.88354 4.26724L6.2825 4.86828L6.88354 4.26724C6.35633 3.74003 5.50156 3.74003 4.97435 4.26724L4.26724 4.97435C3.74004 5.50156 3.74004 6.35633 4.26724 6.88354L5.57153 8.18782C4.99423 9.07734 4.57201 10.0776 4.34384 11.15H2.5C1.75442 11.15 1.15 11.7544 1.15 12.5V13.5C1.15 14.2456 1.75442 14.85 2.5 14.85H4.34383C4.572 15.9223 4.99423 16.9227 5.57154 17.8122L4.26727 19.1165ZM17.15 13C17.15 15.292 15.292 17.15 13 17.15C10.708 17.15 8.85 15.292 8.85 13C8.85 10.708 10.708 8.85 13 8.85C15.292 8.85 17.15 10.708 17.15 13Z"
              stroke="black"
              strokeWidth="1.7"
            />
          </svg>
          <br />
          Settings
        </div>
      </Link>
    </div>
  );
}
