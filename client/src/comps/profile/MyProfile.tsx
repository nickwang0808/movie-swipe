import React, { useState } from "react";
import ListViewButton from "../ButtonComps/ListViewButton";
import style from "./MyProfile.module.css";
import Modal from "../notification/modal";
import { cfaSignOut } from "capacitor-firebase-auth";
import { auth } from "../../firebase/config";
import WatchGroups from "./WatchGroups";

export default function MyProfile() {
  const [showFriends, setShowFriends] = useState(false);

  if (showFriends)
    return <WatchGroups handleBack={() => setShowFriends(false)} />;
  return (
    <div>
      {/* <Modal /> */}
      <h1>My Profile</h1>
      <div className={style.settings_container}>
        <ListViewButton
          name="Watch Groups"
          action={() => setShowFriends(true)}
        />
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
