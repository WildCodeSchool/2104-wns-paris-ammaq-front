import React from "react";
import { useQuery } from "@apollo/client";
import UserNav from "./UserNav/index";
import ChannelNav from "./ChannelNav";
import Meet from "./Meet";
import ChannelType from "../types/Channel";
import { ChannelsQuery } from "../graphql/queries/channel";

export default function Community(): JSX.Element {
  const { loading, error, data } = useQuery(ChannelsQuery);

  return (
    <div className="w-screen flex">
      {
        // Todo : remplacer le tableau vide par un Loader/Skeleton du composant Channel
      }
      <ChannelNav channels={loading ? [] : data.channels} />
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
