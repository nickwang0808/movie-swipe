import React from "react";
import ListViewButton from "../ButtonComps/ListViewButton";
// import { auth } from "../../firebase/config";
import style from "./MyProfile.module.css";
import Modal from "../notification/modal";
import { cfaSignOut } from "capacitor-firebase-auth";
import { auth } from "../../firebase/config";

export default function MyProfile() {
  return (
    <div>
      {/* <Modal /> */}
      <h1>My Profile</h1>
      <div className={style.settings_container}>
        <ListViewButton name="Watch Groups" />
        <ListViewButton name="Disliked Media" />
        <ListViewButton name="About MediaSync" />
        <ListViewButton
          name="Sign Out"
          action={() => cfaSignOut().subscribe()}
        />
        <ListViewButton
          name="Delete Account"
          action={() => {
            console.log("deleted");
            auth.currentUser?.delete().then(() => window.location.reload());
          }}
        />
      </div>
    </div>
  );
}
