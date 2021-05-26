import React from "react";
import classNames from "classnames";
import { Edit2, Video } from "react-feather";

type ChannelProps = {
  name: string;
  isVocal: boolean;
  isActive: boolean;
};

const Channel = ({ name, isVocal, isActive }: ChannelProps): JSX.Element => {
  const itemClass = classNames(
    "items-center cursor-pointer p-4 bg-mainnav mt-5 rounded flex justify-between",
    {
      "shadow-pressed text-white": isActive,
      "shadow-channels text-community-green-light": !isActive && isVocal,
      "shadow-channels text-community-blue": !isActive && !isVocal,
    }
  );
  return (
    <li className={itemClass}>
      <div className="flex flex-nowrap truncate items-center">
        {isVocal ? (
          <Edit2 className="inline-block mr-2 w-4" />
        ) : (
          <Video className="inline-block mr-2 w-4" />
        )}
        <span className="truncate">{name}</span>
      </div>
      {isActive && (
        <span className="ml-2 rounded-full bg-community-green-light w-4 h-4" />
      )}
    </li>
  );
};

export default Channel;
