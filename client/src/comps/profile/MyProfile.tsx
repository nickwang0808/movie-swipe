import React from "react";
import ListViewButton from "../ButtonComps/ListViewButton";
// import { auth } from "../../firebase/config";
import style from "./MyProfile.module.css";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import { cfaSignOut } from "capacitor-firebase-auth";

export default function MyProfile() {
  return (
    <div>
      <h1>My Profile</h1>
      <div className={style.settings_container}>
        <ListViewButton
          name="Watch Groups" 
        />
        <ListViewButton name="Disliked Media" />
        <ListViewButton name="About MediaSync" />
        <ListViewButton
          name="Sign Out"
          action={() => cfaSignOut().subscribe()}
        />
        <ListViewButton name="Delete Account" />
      </div>
    </div>
  );
}
