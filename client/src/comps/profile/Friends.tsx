import React, { useContext, useState } from "react";
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
  const [friendToDelete, setFriendToDelete] = useState<userInfo>();

  const handleInvite = async () => {
    if (emailInput === userAuth?.userInfo.email) {
      setMessage("you can't add yourself as friend");
    } else if (emailInput.length === 0) {
      setMessage("please input email");
    } else if (emailInput === userAuth?.userInfo.email) {
      setMessage("You can't add yourself as friends");
    } else {
      setDisableInvite(true);
      const friendReqStatus = await cloudFn.httpsCallable("sendFriendReq")({
        email: emailInput,
      });
      if (
        friendReqStatus.data.message ===
        "There is no user record corresponding to the provided identifier."
      ) {
        setMessage("No users with this email");
      } else {
        setMessage(friendReqStatus.data.message);
      }
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
        <h1>
          <BackButton linkTo="/profile" />
          Friends
        </h1>
        <div className="container_subcontent">
          <p className="marginSides2 marginTop2 marginBottom2">
            We'll let you know when you and your friends both want to watch
            something!
          </p>
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
                      key={user.uid}
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
