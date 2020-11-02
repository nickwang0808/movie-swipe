import React, { useState } from "react";
import ListViewButton from "../ButtonComps/ListViewButton";
import style from "./MyProfile.module.css";
import Modal from "../notification/modal";
import { cfaSignOut } from "capacitor-firebase-auth";
import { auth } from "../../firebase/config";
import WatchGroups from "./WatchGroups";
import { Link, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

export default function MyProfile() {
  return (
    <div>
      {/* <Modal /> */}
      <h1>My Profile</h1>
      <div className={style.settings_container}>
        <Link to="/profile/watch-groups">
          <ListViewButton name="Watch Groups" />
        </Link>
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
      <Route exact path="/profile/watch-groups">
        <WatchGroups />
      </Route>
    </div>
  );
}
