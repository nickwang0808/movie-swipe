import React, { useContext } from "react";
import style from "./MyProfile.module.css";
import ListViewPendingInvite from "../ButtonComps/ListViewPendingInvite";
import { IIdEmail } from "../../db-operations/useGetUser";
import { cloudFn } from "../../firebase/config";
import { accept, decline } from "../../db-operations/handleFriendReq";
import { UserContext } from "../../store";

interface IPendingInvite {
  pendingReceived: IIdEmail[] | undefined;
}

export default function PendingInvite({ pendingReceived }: IPendingInvite) {
  const { userAuth } = useContext(UserContext);

  const handleDecline = async (senderId: string) => {
    if (userAuth) {
      decline(userAuth.userInfo.uid, senderId); // this directly writes to the db of the current user
      const results = await cloudFn.httpsCallable("declineRequest")({
        id: senderId,
      });
      console.log(results);
    }
  };
  const handleAccept = async (senderId: string) => {
    if (userAuth) {
      accept(userAuth.userInfo.uid, senderId); // this directly writes to the db of the current user
      const results = await cloudFn.httpsCallable("acceptRequest")({
        id: senderId,
      });
      console.log(results);
    }
  };

  return (
    <div className="container_subcontent">
      <div className={`${"title"}`}>
        <div className="listview_separator_full" />
        <h2>Pending Invites</h2>
      </div>
      {pendingReceived &&
        pendingReceived.map((user) => {
          return (
            <ListViewPendingInvite
              handleDecline={() => handleDecline(user.id)}
              handleAccept={() => handleAccept(user.id)}
              name={user.email}
              key={user.id}
            />
          );
        })}
    </div>
  );
}
