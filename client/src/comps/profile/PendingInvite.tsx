import React from "react";
import style from "./MyProfile.module.css";
import ListViewPendingInvite from "../ButtonComps/ListViewPendingInvite";
import { IIdEmail } from "../../db-operations/useGetUser";

interface IPendingInvite {
  pendingReceived: IIdEmail[] | undefined;
}

export default function PendingInvite({ pendingReceived }: IPendingInvite) {
  return (
    <div className="container_subcontent">
      <div className={`${"title"}`}>
        <h2>Pending Invites</h2>
      </div>
      {pendingReceived &&
        pendingReceived.map((user) => {
          return (
            <ListViewPendingInvite
              handleDecline={() => console.log("Decline")}
              handleAccept={() => console.log("accept")}
              name={user.email}
              key={user.id}
            />
          );
        })}
    </div>
  );
}
