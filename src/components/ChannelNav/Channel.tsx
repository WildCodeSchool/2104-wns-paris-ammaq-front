import React, { useState } from "react";
import classNames from "classnames";
import { Edit2, Settings, Video } from "react-feather";

import EditChan from "./EditChan";

type ChannelProps = {
  name: string;
  isVocal: boolean;
  isActive: boolean;
  chanId: string;
};

const Channel = ({
  name,
  isVocal,
  isActive,
  chanId,
}: ChannelProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const switchModal = () => {
    setOpen(!open);
  };

  const itemClass = classNames(
    "chan items-center cursor-pointer p-4 bg-mainnav mt-5 rounded flex justify-between",
    {
      "shadow-pressed text-white": isActive,
      "shadow-channels text-community-green-light": !isActive && !isVocal,
      "shadow-channels text-community-blue": !isActive && isVocal,
    }
  );
  return (
    <li className={itemClass} data-testid="channel">
      <div className="flex flex-nowrap truncate items-center">
        {isVocal ? (
          <Video className="inline-block mr-2 w-4" />
        ) : (
          <Edit2 className="inline-block mr-2 w-4" />
        )}
        <span className="truncate">{name}</span>
      </div>
      <Settings
        onClick={switchModal}
        className="settings w-4 h-4 text-gray-400"
      />
      {isActive && (
        <span
          className={`ml-2 rounded-full w-4 h-4 ${
            isVocal ? "bg-community-blue" : "bg-community-green-light"
          }`}
        />
      )}
      {open && (
        <EditChan
          closeModal={switchModal}
          id={chanId}
          chanName={name}
          isVocal={isVocal}
        />
      )}
    </li>
  );
};

export default Channel;
