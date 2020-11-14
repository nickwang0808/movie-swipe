import React, { useContext, useEffect, useState } from "react";
import style from "./MyProfile.module.css";
import sharedstyle from "../ButtonComps/ButtonComps.module.css";
import ListViewFriendsButton from "../ButtonComps/ListViewFriendsButton";
import PendingInvite from "./PendingInvite";
import BackButton from "../ButtonComps/BackButton";
import { UserContext } from "../../store";
import { cloudFn } from "../../firebase/config";
import { deleteFriend } from "../../db-operations/handleFriendReq";
import Modal from "../notification/modal";
import RemoveFriend from "../notification/ModalContent/RemoveFriend";
import { userInfo } from "../../db-operations/useGetUser";

export default function Friends() {
  const { userAuth, userProfile } = useContext(UserContext);

  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState<string>();
  const [disableInvite, setDisableInvite] = useState(false);
  const [setShowDeleteConfirmation, setSetShowDeleteConfirmation] = useState(
    false
  );
  const [friendToDelete, setFriendToDelete] = useState<userInfo>();

  const handleInvite = async () => {
    if (emailInput === userAuth?.userInfo.email) {
      setMessage("you can't add yourself as friend");
    } else if (emailInput.length === 0) {
      setMessage("please input email");
    } else {
      setDisableInvite(true);
      const frienReqStatus = await cloudFn.httpsCallable("sendFriendReq")({
        email: emailInput,
      });
      console.log("Friends -> frienReqStatus", frienReqStatus.data.message);

      setMessage(frienReqStatus.data.message);
      setEmailInput("");
      setDisableInvite(false);
    }
  };

  return (
    <>
      {friendToDelete && (
        <Modal closeAction={() => setFriendToDelete(undefined)}>
          <RemoveFriend
            closeAction={() => setFriendToDelete(undefined)}
            deleteAction={deleteFriend}
            friendInfo={friendToDelete}
            userId={userAuth?.userInfo.uid as string}
          />
        </Modal>
      )}
      <div className="container_allcontent">
        <div className={style.container_header}>
          <h1>
            <BackButton linkTo="/profile" />
            Friends
          </h1>
        </div>
        <div className={style.container_subcontent}>
          <h2 className={style.title_bold}>
            We'll let you know when you and your friends both want to watch
            something!
          </h2>
          {userProfile && userProfile.pending_received.length > 0 && (
            <PendingInvite pendingReceived={userProfile?.pending_received} />
          )}

          {userProfile && userProfile.friends.length > 0 && (
            <div className="container_subcontent">
              <div className={`${"title"}`}>
                <div className="listview_separator_full" />
                <h2>Friends</h2>
              </div>
              {userProfile &&
                userAuth &&
                userProfile.friends.map((user) => {
                  return (
                    <ListViewFriendsButton
                      name={user.name}
                      key={user.id}
                      action={() => setFriendToDelete(user)}
                    />
                  );
                })}
            </div>
          )}

          <div className="container_subcontent">
            <div className={`${"title"}`}>
              <div className="listview_separator_full" />
              <h2>Invite New Friends</h2>
            </div>
            <div className={style.container_inset}>
              <div className={style.invite_input_container}>
                <input
                  className={style.input_invite}
                  type="text"
                  placeholder="Enter email..."
                  onChange={(e) => setEmailInput(e.target.value)}
                  value={emailInput}
                />
                <button
                  disabled={disableInvite}
                  onClick={handleInvite}
                  className={`${sharedstyle.btn}`}
                >
                  Invite
                </button>
              </div>
              {message && <p className={style.error}>{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}