import React from "react";
import ScreenWIthHeader from "../../comp/Layout/ScreenWIthHeader";
import ProfileItem from "../../comp/ListItem/ProfileItem";
import { Separator } from "../../theme/BaseComp";

export default function ProfileMainScreen() {
  return (
    <ScreenWIthHeader title="Profile">
      <ProfileItem title="SignIn or Register" />
      <ProfileItem title="About Movie Sync" />
      <Separator />
      <ProfileItem title="hello" />
      <ProfileItem title="hello" />
    </ScreenWIthHeader>
  );
}
