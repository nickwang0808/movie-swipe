import React from "react";
import style from "./MyProfile.module.css";
import ListViewPendingInvite from "../ButtonComps/ListViewPendingInvite";
import { IIdEmail } from "../../db-operations/useGetUser";
import { cloudFn } from "../../firebase/config";

interface IPendingInvite {
  pendingReceived: IIdEmail[] | undefined;
}

export default function PendingInvite({ pendingReceived }: IPendingInvite) {
  const handleDecline = async (id: string) => {
    const results = await cloudFn.httpsCallable("decline")({ id });
    console.log(results);
  };
  const handleAccept = async (id: string) => {
    const results = await cloudFn.httpsCallable("accept")({ id });
    console.log(results);
  };

  return (
    <div className="container_subcontent">
      <div className={`${"title"}`}>
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
