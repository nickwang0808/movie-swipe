import React from "react";
import { auth } from "../../firebase/config";
import ListViewButton from "../ButtonComps/ListViewButton";
import style from "./MyProfile.module.css";

export default function MyProfile() {
  return (
    <>
      <h1>My Profile</h1>
      <div className={style.settings_container}></div>
      <ListViewButton name="Invites and Groups" />
      <ListViewButton name="Disliked Media" />
      <ListViewButton name="About MediaSync" />
      <ListViewButton name="Sign Out" action={() => auth.signOut()} />
      <ListViewButton name="Delete Account" />
    </>
  );
}
