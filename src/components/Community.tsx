import React from "react";
import UserNav from "./UserNav/index";
import ChannelNav from "./ChannelNav";
import Meet from "./Meet";

export default function Community(): JSX.Element {
  return (
    <div className="w-screen flex">
      <ChannelNav />
      <Meet
        parentNode="jitsy-container"
        roomName="WORKIT-cours-karim"
        displayName="Quentin"
        subject="cours-karim"
        width={1425}
        height={935}
      />
      <UserNav />
    </div>
  );
}
