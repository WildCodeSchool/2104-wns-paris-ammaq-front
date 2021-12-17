import React from "react";
import classNames from "classnames";
import { Edit2, Settings, Video } from "react-feather";
import ChannelType from "../../types/Channel";
import { useAuth } from "../../context/auth-provider";

type ChannelProps = {
  channel: ChannelType;
  isActive: boolean;
  openModal: () => void;
  onClick: () => void;
};

const Channel = ({
  channel,
  isActive,
  openModal,
  onClick,
}: ChannelProps): JSX.Element => {
  const itemClass = classNames(
    "channels items-center cursor-pointer p-4 bg-mainnav mt-5 rounded flex justify-between",
    {
      "shadow-pressed text-white": isActive,
      "shadow-channels text-community-green-light":
        !isActive && !channel.isVocal,
      "shadow-channels text-community-blue": !isActive && channel.isVocal,
    }
  );
  const { token } = useAuth();
  return (
    <button
      className={itemClass}
      data-testid="channel"
      type="button"
      onClick={onClick}
    >
      <div className="flex flex-nowrap truncate items-center">
        {channel.isVocal ? (
          <Video className="inline-block mr-2 w-4" />
        ) : (
          <Edit2 className="inline-block mr-2 w-4" />
        )}
        <span className="truncate">{channel.name}</span>
      </div>
      {token?.role === "admin" ? (
        <Settings
          onClick={openModal}
          className="settings w-4 h-4 text-gray-400"
        />
      ) : null}

      {isActive && (
        <span
          className={`ml-2 rounded-full w-4 h-4 ${
            channel.isVocal ? "bg-community-blue" : "bg-community-green-light"
          }`}
        />
      )}
    </button>
  );
};

export default Channel;
