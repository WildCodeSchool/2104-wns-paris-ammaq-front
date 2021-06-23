import React from "react";
import classNames from "classnames";
import { Edit2, Video } from "react-feather";
import "./channel.css";

const ChannelLoading = (): JSX.Element => {
  return (
    <li className="items-center cursor-pointer p-4 mt-5 rounded flex justify-between shadow-channels channelLoading">
      <div className="flex flex-nowrap truncate items-center">
        <span className="truncate" />
      </div>
    </li>
  );
};

export default ChannelLoading;
