import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Edit, Trash, MoreHorizontal, X } from "react-feather";
import { UserByMail } from "../../graphql/queries/user";
import { useAuth } from "../../context/auth-provider";
import EditInput from "./EditInput";
import { DeleteMessage } from "../../graphql/mutations/message";
import "./message.css";

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

  const closeOptions = () => {
    setOptions(false);
    setEditInput(false);
  };

  return (
    <div className="flex text-white">
      {loading && <h1>Loading</h1>}
      <div className="group flex items-center">
        {data?.userByMail.firstname !== token?.firstname ? (
          <img
            className="w-8 h-8 rounded-full"
            src={data?.userByMail.avatar}
            alt="avatar"
          />
        ) : null}
        <div className="">
          {data?.userByMail.firstname !== token?.firstname ? (
            <h3 className="text-community-green-light px-3 font-bold">
              {data?.userByMail.firstname}
            </h3>
          ) : null}
          {data?.userByMail.firstname === token?.firstname ? (
            <h3 className="text-community-blue px-3 text-right font-bold">
              {data?.userByMail.firstname}
            </h3>
          ) : null}
          {editInput && (
            <EditInput
              content={message}
              id={messageId}
              channelId={channelId}
              userId={userId}
              close={() => setEditInput(false)}
            />
          )}
          {!editInput && (
            <p
              className={`rounded-xl w-auto shadow-message p-2 m-2 ${
                userId === token?.email ? "text-right" : null
              }`}
            >
              {message}
            </p>
          )}
          <div
            className={`text-xs p-2 h-6 ${
              userId === token?.email ? "flex place-self-end" : null
            }`}
          >
            <h5
              className={`hidden text-main-lighterGrey group-hover:inline ${
                userId === token?.email ? "text-right" : null
              }`}
            >
              {createdAt && updatedAt === createdAt
                ? getRealDate(updatedAt)
                : `modifié ${getRealDate(updatedAt)}`}
            </h5>
          </div>
        </div>
        <div className="flex flex-col h-18">
          {data?.userByMail.firstname === token?.firstname ? (
            <img
              className={`w-8 h-8 rounded-full ${options ? "pl-2" : null}`}
              src={data?.userByMail.avatar}
              alt="avatar"
            />
          ) : null}
          {userId === token?.email && (
            <div className="flex justify-center place-items-center">
              {!options && (
                <button type="button" onClick={() => setOptions(true)}>
                  <MoreHorizontal />
                </button>
              )}
              {options && (
                <div className="flex flex-col absolute rounded-lg backdrop-blur-md p-3 border-solid border-2 border-community-blue appear">
                  <button type="button" onClick={() => handleDelete(messageId)}>
                    <Trash className="text-main-red mb-2" />
                  </button>
                  <button type="button" onClick={() => handleEdit()}>
                    <Edit className="text-main-white" />
                  </button>
                  <button type="button" onClick={() => closeOptions()}>
                    <X className="w-6 text-main-red m-auto" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
