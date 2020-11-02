import React, { useState } from "react";
import ListViewButton from "../ButtonComps/ListViewButton";
import style from "./MyProfile.module.css";
import Modal from "../notification/modal";
import { cfaSignOut } from "capacitor-firebase-auth";
import { auth } from "../../firebase/config";
import WatchGroups from "./WatchGroups";

import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import { Link } from "react-router-dom";

export default function MyProfile() {
  return (
    <div>
      {/* <Modal /> */}
      <Route exact path="/profile">
        <h1>My Profile</h1>
        <div className={style.settings_container}>
          <Link className="link" to="/profile/watch-groups">
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
      </Route>
      <Route exact path="/profile/watch-groups">
        <WatchGroups />
      </Route>
    </div>
  );
}
