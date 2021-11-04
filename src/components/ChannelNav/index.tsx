/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Fragment } from "react";
import { ApolloError } from "@apollo/client";
import { Tab } from "@headlessui/react";
import Header from "./Header";
import Channel from "./Channel";
import ChannelLoading from "./ChannelLoading";
import ChannelType from "../../types/Channel";

type ChannelNavProps = {
  channels: ChannelType[] | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

const ChannelNav = ({
  channels,
  loading,
  error,
}: ChannelNavProps): JSX.Element => {
  return (
    <div
      className="w-2/12 h-full flex flex-col bg-main-darkgrey p-2 text-xs"
      data-testid="channels"
    >
      <Header />
      <div
        data-testid="list-channels"
        className="list-channels overflow-x-hidden overflow-y-scroll"
      >
        {loading && (
          <>
            <ChannelLoading />
            <ChannelLoading />
            <ChannelLoading />
          </>
        )}
        {error && <p>error: {error}</p>}
        {channels &&
          channels?.map((element: ChannelType) => {
            return (
              <Tab as="div" key={element.id}>
                {({ selected }) => (
                  <Channel
                    name={element.name}
                    isVocal={element.isVocal}
                    isActive={selected}
                  />
                )}
              </Tab>
            );
          })}
      </div>
    </div>
  );
};

export default ChannelNav;
