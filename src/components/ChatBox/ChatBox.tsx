import React from "react";
import ChannelType from "../../types/Channel";

type ChatBoxProps = {
  channel: ChannelType;
};

const ChatBox = ({ channel }: ChatBoxProps): JSX.Element => {
  return (
    <div className="h-full p-5 pl-0">
      <div className="h-full shadow-pressed rounded-xl flex flex-col justify-between p-5">
        <div className="h-full">
          {/* TODO */}
          <p>Messages box</p>
        </div>
        <input
          type="text"
          placeholder={`Envoyer un message dans #${channel.name}`}
          className="shadow-channels px-6 py-3 rounded-xl bg-main-lightgrey text-white placeholder-white placeholder-opacity-20"
        />
      </div>
    </div>
  );
};

export default ChatBox;