import React, { useState } from "react";
import ListViewButton from "../ButtonComps/ListViewButton";
import style from "./MyProfile.module.css";
import Modal from "../notification/modal";
import { cfaSignOut } from "capacitor-firebase-auth";
import { auth } from "../../firebase/config";
import Friends from "./Friends";
import About from "./About";
import DislikedMovies from "./DislikedMovies";
import { motion } from "framer-motion";
import { Link, Route } from "react-router-dom";
import DeleteConfirmation from "./DeleteConfirmation";

export default function MyProfile() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <div>
      {showDeleteConfirmation && (
        <Modal closeAction={() => setShowDeleteConfirmation(false)}>
          <DeleteConfirmation
            action={() => {
              console.log("deleted");
              auth.currentUser?.delete().then(() => window.location.reload());
              // TODO: need to fix re-auth issue
            }}
          />
        </Modal>
      )}
      <Route exact path="/profile">
        <h1>My Profile</h1>
        <motion.div
          animate={{ opacity: 1, paddingTop: "0rem" }}
          initial={{ opacity: 0, paddingTop: "2rem" }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={style.settings_container}
        >
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
            action={() => setShowDeleteConfirmation(true)}
          />
        </motion.div>
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
