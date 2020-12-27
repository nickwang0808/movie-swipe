import React from "react";
import sharedStyle from "../ButtonComps/ButtonComps.module.css";
import style from "../notification/notification.module.css";


interface IDeleteConfirmation {
  action: () => void;
}

export default function DeleteConfirmation({ action }: IDeleteConfirmation) {
  return (
    <>
      <h1>Delete Your Account</h1>
      <div className={style.modal_body}>
        <p>You are about to delete your account. All your matches, friends and associated data will be removed. Thanks for joining us!</p>
        <div className={style.container_actions}>
          <button className={`${sharedStyle.btn} ${sharedStyle.btn_outline}`}onClick={action}>Delete Account</button>
        </div>
      </div>
    </>
  );
}
