import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";
import { Tab } from "@headlessui/react";
import { Jutsu } from "../utils/Jutsu";
import ChannelNav from "../components/ChannelNav";
import { ChannelsQuery } from "../graphql/queries/channel";
import { useAuth } from "../context/auth-provider";
import { userConfig, adminConfig } from "../utils/configJisti";
import ChatBox from "../components/ChatBox/ChatBox";
import ChannelType from "../types/Channel";
import UserNav from "../components/UserNav";

function Loader(): JSX.Element {
  return <p className="text-white">Loading</p>;
}

export default function Community(): JSX.Element {
  const { loading, error, data } = useQuery(ChannelsQuery);
  const { token } = useAuth();
  if (loading) return <Loader />;
  if (error) return <p>Error</p>;

  return (
    <Tab.Group as="div" className="w-screen flex">
      <Tab.List as={Fragment}>
        <ChannelNav channels={data?.channels} loading={loading} error={error} />
      </Tab.List>
      {data?.channels && (
        <Tab.Panels as={Fragment}>
          {data?.channels.map((channel: ChannelType) => (
            <Tab.Panel as="div" className="flex-1" key={channel.id}>
              {channel.isVocal ? (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <Jutsu
                  roomName={`WORKIT-${channel.name}`}
                  subject={channel.name}
                  displayName="Quentin"
                  height={window.innerHeight}
                  configOverwrite={
                    token?.role === "admin" ? adminConfig : userConfig
                  }
                />
              ) : (
                <ChatBox channelId={channel.id} />
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      )}
      <UserNav />
    </Tab.Group>
  );
}
