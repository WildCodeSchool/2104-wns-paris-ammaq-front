import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Jutsu } from "../utils/Jutsu";
import UserNav from "./UserNav/index";
import ChannelNav from "./ChannelNav";
import { ChannelsQuery } from "../graphql/queries/channel";

function Loader(): JSX.Element {
  return <p className="text-white">Loading</p>;
}

export default function Community(): JSX.Element {
  const { loading, error, data } = useQuery(ChannelsQuery);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-screen flex">
      <ChannelNav
        channels={data?.channels}
        loading={loading}
        error={error}
        active={activeIndex}
        handleSwitch={(index) => setActiveIndex(index)}
      />
      <div className="flex-1">
        {data && (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <Jutsu
            roomName={`WORKIT-${data?.channels[activeIndex].name}`}
            subject={data?.channels[activeIndex].name}
            displayName="Quentin"
            height={window.innerHeight}
            loadingComponent={Loader}
          />
        )}
      </div>
      <UserNav />
    </div>
  );
}
