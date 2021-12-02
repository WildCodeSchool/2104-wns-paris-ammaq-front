import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Jutsu } from "../utils/Jutsu";
import UserNav from "../components/UserNav/index";
import ChannelNav from "../components/ChannelNav";
import { ChannelsQuery } from "../graphql/queries/channel";
import { useAuth } from "../context/auth-provider";
import { userConfig, adminConfig } from "../utils/configJisti";

function Loader(): JSX.Element {
  return <p className="text-white">Loading</p>;
}

export default function Community(): JSX.Element {
  const { loading, error, data } = useQuery(ChannelsQuery);
  const { token, setToken } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  if (loading) return <Loader />;
  if (error) return <p>Error</p>;

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
        {data?.channels &&
          (data.channels[activeIndex].isVocal ? (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <Jutsu
              roomName={`WORKIT-${data.channels[activeIndex].name}`}
              subject={data.channels[activeIndex].name}
              displayName="Quentin"
              height={window.innerHeight}
              loadingComponent={Loader}
              configOverwrite={
                token?.role === "admin" ? adminConfig : userConfig
              }
            />
          ) : (
            <div>Channel {data.channels[activeIndex].name}</div>
          ))}
      </div>
      <UserNav />
    </div>
  );
}
