/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import Header from "./Header";
import Channel from "./Channel";
import ChannelType from "../../types/Channel";

type ChannelNavProps = {
  channels: ChannelType[];
};

const ChannelNav = ({ channels }: ChannelNavProps): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-2/12 min-h-screen bg-main-darkgrey p-2 text-xs">
      <Header />
      <ul>
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
      </ul>
    </div>
  );
};

export default ChannelNav;
