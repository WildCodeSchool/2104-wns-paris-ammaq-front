import React from "react";
import { Edit2, Video } from "react-feather";

const ChannelNav = (): JSX.Element => {
  return (
    <nav>
      <ul>
        <li className="p-4 bg-gray-900 m-4 text-white rounded  flex justify-between">
          <div>
            <Edit2 className="inline-block mr-2" />
            Ammaq
          </div>
          <span className="rounded-full bg-green-500 h-6 w-6" />
        </li>
        <li className="p-4 bg-gray-900 m-4 text-blue-700 rounded  flex justify-between">
          <div>
            <Video className="inline-block mr-2" />
            Caféteria
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default ChannelNav;
