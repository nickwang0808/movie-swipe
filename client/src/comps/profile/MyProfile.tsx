import React from "react";
// import { auth } from "../../firebase/config";
import ListViewButton from "../ButtonComps/ListViewButton";
import style from "./MyProfile.module.css";

import { cfaSignOut } from "capacitor-firebase-auth";

export default function MyProfile() {
  return (
    <div>
      <h1>My Profile</h1>
      <div className={style.settings_container}>
        <ListViewButton name="Invites and Groups" />
        <ListViewButton name="Disliked Media" />
        <ListViewButton name="About MediaSync" />
        <ListViewButton
          name="Sign Out"
          action={() => cfaSignOut().subscribe()}
        />
        {/* <ListViewButton name="Sign Out" action={() => auth.signOut()} /> */}
        <ListViewButton name="Delete Account" />
      </div>
    </div>
  );
}
