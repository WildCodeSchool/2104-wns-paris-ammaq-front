import React, { useState } from "react";
import { ApolloError } from "@apollo/client";
import { Tab } from "@headlessui/react";
import Header from "./Header";
import Channel from "./Channel";
import ChannelLoading from "./ChannelLoading";
import ChannelType from "../../types/Channel";
import EditModal from "./EditModal";

type ChannelNavProps = {
  channels: ChannelType[] | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

const ChannelTab = ({ channel }: { channel: ChannelType }) => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <Tab as="div">
        {({ selected }) => (
          <Channel
            channel={channel}
            isActive={selected}
            openModal={openModal}
          />
        )}
      </Tab>
      <EditModal channel={channel} open={open} closeModal={closeModal} />
    </>
  );
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
          channels?.map((channel: ChannelType) => (
            <ChannelTab key={channel.id} channel={channel} />
          ))}
      </div>
    </div>
  );
};

export default ChannelNav;
