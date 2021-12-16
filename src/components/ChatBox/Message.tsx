import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { UserByMail } from "../../graphql/queries/user";
import { useAuth } from "../../context/auth-provider";
import { MessageById } from "../../graphql/queries/message";

type MessageBoxProps = {
  message?: string;
  userId?: string;
  date: Date;
};

const Message = ({ message, userId, date }: MessageBoxProps): JSX.Element => {
  const { loading, data } = useQuery(UserByMail, {
    variables: { email: userId },
  });

  const { token } = useAuth();

  const messageDate = new Date(date);
  const day = messageDate.getDate();
  const month = messageDate.getMonth() + 1;
  const year = messageDate.getFullYear();
  const completeDate = `${day}/${month}/${year}`;
  // When there is only one number, the zero doesn't display, we will change that on develop
  // with time functions created with the Dashboard
  const time = `${messageDate.getHours()}:${messageDate.getMinutes()}`;

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
            le {completeDate} à {time}
          </h5>
        </div>

        <p>{message}</p>
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
    </div>
  );
};

export default Message;
