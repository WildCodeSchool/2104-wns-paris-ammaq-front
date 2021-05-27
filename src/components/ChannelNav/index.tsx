/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import { ApolloError } from "@apollo/client";
import _ from "lodash";
import Header from "./Header";
import Channel from "./Channel";
import ChannelType from "../../types/Channel";

type ChannelNavProps = {
  loading: boolean;
  error: ApolloError | undefined;
  channels: ChannelType[] | undefined;
};

const ChannelNav = ({
  loading,
  error,
  channels,
}: ChannelNavProps): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  const channelList = _.orderBy(channels, ["isVocal"], ["asc"]).map(
    (element: ChannelType, index: number) => {
      const isActive = activeIndex === index;
      return (
        <div
          key={element.id}
          role="button"
          tabIndex={index}
          onClick={() => handleClick(index)}
        >
          <Channel
            name={element.name}
            isVocal={element.isVocal}
            isActive={isActive}
          />
        </div>
      );
    }
  );

  // TODO : Ajouter un meilleur loading & error
  return (
    <div className="w-2/12 min-h-screen bg-main-darkgrey p-2 text-xs">
      <Header />
      {loading ? <p>loading</p> : null}
      {channels ? <ul>{channelList}</ul> : null}
      {error ? <p>Error</p> : null}
    </div>
  );
};

export default ChannelNav;
