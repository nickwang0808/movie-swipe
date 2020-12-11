import React from "react";
import SubContent from "../../comp/Layout/SubContent";
import FriendsItem from "../../comp/ListItem/FriendsItem";
import InviteFriend from "../../comp/Misc/InviteFriend";

export default function FriendsScreen() {
  return (
    <>
      <p className="marginSides2 marginTop2 marginBottom2">
        We'll let you know when you and your friends both want to watch
        something!
      </p>

      {/* <SubContent>
        <PendingInviteItem
          name="Nick Wang"
          handleAccept={() => console.log("Accpet")}
          handleDecline={() => console.log("Accpet")}
        />
      </SubContent> */}

      <SubContent title="Friends">
        <FriendsItem name="Nick Wang" />
        <FriendsItem name="Nick Wang" />
        <FriendsItem name="Nick Wang" />
      </SubContent>

      <SubContent title="Invite New Friends">
        <InviteFriend message="Something went wrong" />
      </SubContent>
    </>
  );
}
