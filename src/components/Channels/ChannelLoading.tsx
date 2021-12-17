import React from "react";
import "./channel.css";

const ChannelLoading = (): JSX.Element => {
  return (
    <li className="items-center p-4 mt-5 rounded flex justify-between shadow-channels channelLoading">
      <div className="flex flex-nowrap truncate items-center">
        <span className="truncate" />
      </div>
    </li>
  );
};

export default ChannelLoading;
