import React, { useState } from "react";
import ListViewButton from "../ButtonComps/ListViewButton";
import style from "./MyProfile.module.css";
import Modal from "../notification/modal";
import { cfaSignOut } from "capacitor-firebase-auth";
import { auth } from "../../firebase/config";
import Friends from "./Frends";
import About from "./About";
import DislikedMovies from "./DislikedMovies";

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
          <Link className="link" to="/profile/friends">
            <ListViewButton name="Friends" />
          </Link>
          <Link className="link" to="/profile/dislikedmovies">
            <ListViewButton name="Disliked Movies" />
          </Link>
          <Link className="link" to="/profile/about">
            <ListViewButton name="About MovieSync" />
          </Link>
          <div className="listview_separator_full" />
          <ListViewButton
            name="Sign Out (XX@gmail.com)"
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
      <Route exact path="/profile/friends">
        <Friends />
      </Route>
      <Route exact path="/profile/about">
        <About />
      </Route>
      <Route exact path="/profile/dislikedmovies">
        <DislikedMovies />
      </Route>
    </div>
  );
}
