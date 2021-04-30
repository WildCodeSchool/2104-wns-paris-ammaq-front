/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { Edit2, Video } from "react-feather";
import classNames from "classnames";

const channelsData = [
  {
    name: "openspace",
    id: 1,
    active: true,
    vocal: true,
  },
  {
    name: "cafeteria",
    id: 2,
    active: false,
    vocal: true,
  },
  {
    name: "cours-react",
    id: 3,
    active: false,
    vocal: true,
  },
  {
    name: "cours-karim",
    id: 4,
    active: false,
    vocal: false,
  },
  {
    name: "cours-nicolas",
    id: 5,
    active: false,
    vocal: false,
  },
  {
    name: "ammaq-beach",
    id: 6,
    active: false,
    vocal: false,
  },
];

const ChannelNav = (): JSX.Element => {
  const [channels, setChannels] = useState(channelsData);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-2/12 min-h-screen bg-main-darkgrey p-2 text-xs">
      <ul>
        {channels.map((element, index) => {
          const isActive = activeIndex === index;
          const itemClass = classNames(
            "items-center cursor-pointer p-4 bg-mainnav mt-5 rounded flex justify-between",
            {
              "shadow-pressed text-white": isActive,
              "shadow-channels text-community-green-light":
                !isActive && element.vocal,
              "shadow-channels text-community-blue":
                !isActive && !element.vocal,
            }
          );
          return (
            <li
              key={element.id}
              className={itemClass}
              onClick={() => handleClick(index)}
            >
              <div className="flex flex-nowrap truncate items-center">
                {element.vocal ? (
                  <Edit2 className="inline-block mr-2 w-4" />
                ) : (
                  <Video className="inline-block mr-2 w-4" />
                )}
                <span className="truncate">{element.name}</span>
              </div>
              {isActive && (
                <span className="ml-2 rounded-full bg-community-green-light w-4 h-4" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChannelNav;
