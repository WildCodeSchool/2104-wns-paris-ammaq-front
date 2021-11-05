/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { FC } from "react";
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

const ChannelNav: FC<ChannelNavProps> = ({
  channels,
  loading,
  error,
  active,
  handleSwitch,
}) => {
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
          chanId={element.id}
          isActive={isActive}
        />
      </div>
    );
  });

  return (
    <div
      className="w-2/12 h-full flex flex-col bg-main-darkgrey p-2 text-xs"
      data-testid="channels"
    >
      <Header />
      <div
        data-testid="list-channels"
        className="list-channels overflow-x-hidden overflow-y-scroll"
      >
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
