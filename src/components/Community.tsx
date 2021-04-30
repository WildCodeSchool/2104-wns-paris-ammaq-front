import React from "react";
import UserNav from "./UserNav/index";
import ChannelNav from "./ChannelNav";

export default function Community(): JSX.Element {
  return (
    <div className="w-screen">
      <ChannelNav />
      <UserNav />
    </div>
  );
}
