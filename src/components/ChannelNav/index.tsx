/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Header from "./Header";
import Channel from "./Channel";
import ChannelLoading from "./ChannelLoading";
import ChannelType from "../../types/Channel";
import { ChannelsQuery } from "../../graphql/queries/channel";

type ChannelNavProps = {
  channels: ChannelType[];
};

const ChannelNav = ({ channels }: ChannelNavProps): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, loading, error } = useQuery(ChannelsQuery);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-2/12 min-h-screen bg-main-darkgrey p-2 text-xs">
      <Header />
      <div data-testid="list-channels">
        {loading ? (
          <>
            <ChannelLoading />
            <ChannelLoading />
            <ChannelLoading />
          </>
        ) : null}
        {channels.map((element: ChannelType, index: number) => {
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
        })}
      </div>
    </div>
  );
};

export default ChannelNav;
