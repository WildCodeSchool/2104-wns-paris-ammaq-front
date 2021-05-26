import React from "react";
import UserNav from "./UserNav/index";
import ChannelNav from "./ChannelNav";
import Meet from "./Meet";
import ChannelType from "../types/Channel";

const channels: ChannelType[] = [
  {
    name: "openspace",
    id: 1,
    isVocal: true,
  },
  {
    name: "cafeteria",
    id: 2,
    isVocal: true,
  },
  {
    name: "cours-react",
    id: 3,
    isVocal: true,
  },
  {
    name: "cours-karim",
    id: 4,
    isVocal: false,
  },
  {
    name: "cours-nicolas",
    id: 5,
    isVocal: false,
  },
  {
    name: "ammaq-beach",
    id: 6,
    isVocal: false,
  },
];

export default function Community(): JSX.Element {
  return (
    <div className=" flex w-screen">
      <ChannelNav channels={channels} />
      <div className="flex-1">
        <Meet
          parentNode="jitsy-container"
          roomName="WORKIT-cours-karim"
          displayName="Quentin"
          subject="cours-karim"
          height={window.innerHeight}
        />
      </div>
      <UserNav />
    </div>
  );
}
