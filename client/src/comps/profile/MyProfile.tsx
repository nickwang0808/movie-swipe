// import firebase from "firebase/app";
import "firebase/auth";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { Link, Route } from "react-router-dom";
import { auth, cloudFn } from "../../firebase/config";
import { UserContext } from "../../store";
import ListViewButton from "../ButtonComps/ListViewButton";
import Modal from "../notification/modal";
import About from "./About";
import DeleteConfirmation from "./DeleteConfirmation";
import DislikedMovies from "./DislikedMovies";
import Friends from "./Friends";
import style from "./MyProfile.module.css";

// var provider = new firebase.auth.GoogleAuthProvider();

export default function MyProfile() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { userAuth } = useContext(UserContext);

  return (
    <div>
      {showDeleteConfirmation && (
        <Modal closeAction={() => setShowDeleteConfirmation(false)}>
          <DeleteConfirmation
            action={async () => {
              localStorage.clear();
              const accountToDelete = auth.currentUser?.uid;
              if (!auth.currentUser?.email) {
                await cloudFn.httpsCallable("deleteAccount")({
                  accountToDelete,
                });
              }
              auth.signOut();
              window.location.reload();
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
              name={`Sign Out (${userAuth?.userInfo.email})`}
              action={() => {
                auth.signOut();
                window.location.reload();
              }}
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
