import React from "react";
import ScreenWIthHeader from "../../comp/Layout/ScreenWIthHeader";
import ProfileItem from "../../comp/ListItem/ProfileItem";
import { Separator } from "../../theme/BaseComp";

export default function ProfileMainScreen() {
  return (
    <ScreenWIthHeader title="Profile">
      <ProfileItem title="hello" />
      <ProfileItem title="hello" />
      <Separator />
      <ProfileItem title="hello" />
      <ProfileItem title="hello" />
    </ScreenWIthHeader>
  );
}
