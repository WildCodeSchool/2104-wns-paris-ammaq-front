/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import { ApolloError } from "@apollo/client";
import Header from "./Header";
import Channel from "./Channel";
import ChannelLoading from "./ChannelLoading";
import ChannelType from "../../types/Channel";

type ChannelNavProps = {
  channels: ChannelType[] | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  active: number;
  handleSwitch: (index: number) => void;
};

const ChannelNav = ({
  channels,
  loading,
  error,
  active,
  handleSwitch,
}: ChannelNavProps): JSX.Element => {
  const channelsList = channels?.map((element: ChannelType, index: number) => {
    const isActive = active === index;
    return (
      <div
        key={element.id}
        role="button"
        tabIndex={index}
        onClick={() => handleSwitch(index)}
      >
        <Channel
          name={element.name}
          isVocal={element.isVocal}
          isActive={isActive}
        />
      </div>
    );
  });

  return (
    <div className="w-2/12 min-h-screen bg-main-darkgrey p-2 text-xs">
      <Header />
      <div data-testid="list-channels">
        {loading && (
          <>
            <ChannelLoading />
            <ChannelLoading />
            <ChannelLoading />
          </>
        )}
        {error && <p>error: {error}</p>}
        {channels && channelsList}
      </div>
    </div>
  );
};

export default ChannelNav;
