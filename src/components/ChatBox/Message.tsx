import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Edit, Trash, MoreHorizontal, X } from "react-feather";
import { UserByMail } from "../../graphql/queries/user";
import { useAuth } from "../../context/auth-provider";
import EditInput from "./EditInput";
import { DeleteMessage } from "../../graphql/mutations/message";

type MessageBoxProps = {
  message?: string;
  userId?: string;
  updatedAt: Date;
  createdAt: Date;
  messageId: string;
  channelId: string;
};

const Message = ({
  message,
  userId,
  updatedAt,
  createdAt,
  messageId,
  channelId,
}: MessageBoxProps): JSX.Element => {
  const [editInput, setEditInput] = useState(false);
  const [options, setOptions] = useState(false);
  const [edited, setEdited] = useState(false);

  const { loading, data } = useQuery(UserByMail, {
    variables: { email: userId },
  });

  const [deleteMessage] = useMutation(DeleteMessage);

  const { token } = useAuth();

  const getRealDate = (date: Date) => {
    console.log("updated - ", updatedAt, "created - ", createdAt);

    const realDate = new Date(date);
    let hours = realDate.getHours().toString();
    let minutes = realDate.getMinutes().toString();

    if (hours.length <= 1) {
      hours = `0${hours}`;
    }

    if (minutes.length <= 1) {
      minutes = `0${minutes}`;
    }

    const day = realDate.getDate();
    const month = realDate.getMonth() + 1;
    const year = realDate.getFullYear();
    const completeDate = `${day}/${month}/${year}`;
    const time = `${hours}:${minutes}`;

    const messageWasSent = `le ${completeDate} à ${time}`;
    return messageWasSent;
  };

  const handleEdit = () => {
    setEditInput(true);
  };

  const handleDelete = (id: string) => {
    deleteMessage({ variables: { id } });
  };

  return (
    <div className="flex flex-1 text-white">
      {loading && <h1>Loading</h1>}
      {data?.userByMail.firstname !== token?.firstname ? (
        <img
          className="w-8 h-8 rounded-full"
          src={data?.userByMail.avatar}
          alt="avatar"
        />
      ) : null}
      <div>
        <div className="flex">
          {data?.userByMail.firstname !== token?.firstname ? (
            <h3 className="text-community-green-light px-3">
              {data?.userByMail.firstname}
            </h3>
          ) : null}
          <h5 className="ml-4">
            {createdAt && updatedAt === createdAt
              ? getRealDate(updatedAt)
              : `modifié ${getRealDate(updatedAt)}`}
          </h5>
        </div>
        {!editInput && <p>{message}</p>}
        {editInput && (
          <EditInput
            content={message}
            id={messageId}
            channelId={channelId}
            userId={userId}
            close={() => setEditInput(false)}
          />
        )}
      </div>

      {data?.userByMail.firstname === token?.firstname ? (
        <div className="flex">
          <h3 className="text-community-blue px-3">
            {data?.userByMail.firstname}
          </h3>
        </div>
      ) : null}
      {data?.userByMail.firstname === token?.firstname ? (
        <img
          className="w-8 h-8 rounded-full"
          src={data?.userByMail.avatar}
          alt="avatar"
        />
      ) : null}
      {userId === token?.email && (
        <>
          {!options && (
            <button type="button" onClick={() => setOptions(true)}>
              <MoreHorizontal />
            </button>
          )}
          {options && (
            <button type="button" onClick={() => setOptions(false)}>
              <X />
            </button>
          )}
          {options && (
            <>
              <button type="button" onClick={() => handleDelete(messageId)}>
                <Trash className="text-main-red ml-4" />
              </button>
              <button type="button" onClick={() => handleEdit()}>
                <Edit className="text-main-orange ml-4" />
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Message;
