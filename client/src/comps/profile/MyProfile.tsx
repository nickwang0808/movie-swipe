import React, { useContext, useState } from "react";
import ListViewButton from "../ButtonComps/ListViewButton";
import style from "./MyProfile.module.css";
import Modal from "../notification/modal";
import { cfaSignOut } from "capacitor-firebase-auth";
import { auth, cloudFn, db } from "../../firebase/config";
import Friends from "./Friends";
import About from "./About";
import DislikedMovies from "./DislikedMovies";
import { motion } from "framer-motion";
import { Link, Route } from "react-router-dom";
import DeleteConfirmation from "./DeleteConfirmation";

import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from "../../store";

var provider = new firebase.auth.GoogleAuthProvider();

export default function MyProfile() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { userAuth } = useContext(UserContext);

  return (
    <div>
      {showDeleteConfirmation && (
        <Modal closeAction={() => setShowDeleteConfirmation(false)}>
          <DeleteConfirmation
            action={async () => {
              console.log("deleted");
              // if (auth.currentUser?.email !== null) {
              //   await auth.currentUser?.reauthenticateWithPopup(provider);
              // }
              const accountToDelete = auth.currentUser?.uid;
              await cloudFn.httpsCallable("deleteAccount")({ accountToDelete });
              auth.signOut();
              // window.location.reload();
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
          {userAuth?.userInfo.email === null ? (
            <Link className="link" to="/completeSignUp">
              <ListViewButton name="Register / Log In" />
            </Link>
          ) : (
            <Link className="link" to="/profile/friends">
              <ListViewButton name="Friends" />
            </Link>
          )}
          {/* <Link className="link" to="/profile/dislikedmovies">
            <ListViewButton name="Disliked Movies" />
          </Link> */}
          <Link className="link" to="/profile/about">
            <ListViewButton name="About MovieSync" />
          </Link>
          <div className="listview_separator_full" />
          {userAuth?.userInfo.email && (
            <ListViewButton
              name={`Sign Out ${userAuth?.userInfo.email}`}
              action={() => auth.signOut()}
            />
          )}

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
