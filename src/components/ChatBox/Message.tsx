import { useMutation, useQuery, useSubscription } from "@apollo/client";
import React from "react";

import { UserByMail } from "../../graphql/queries/user";
import { useAuth } from "../../context/auth-provider";
import { MESSAGES_SUBSCRIPTION } from "../../graphql/mutations/message";

type MessageBoxProps = {
  message: string;
  user?: string;
};

const Message = ({ message, user }: MessageBoxProps): JSX.Element => {
  const { loading, error, data } = useQuery(UserByMail, {
    variables: { email: user },
  });

  useSubscription(MESSAGES_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData: result }) => {
      console.log({ result });
    },
  });

  const { token } = useAuth();

  return (
    <div className="flex text-white">
      {loading && <h1>Loading</h1>}
      <img
        className="w-8 h-8 rounded-full"
        src={data?.userByMail.avatar}
        alt="avatar"
      />
      <div>
        <h3
          className={
            data?.userByMail.firstname === token?.firstname
              ? `text-community-blue`
              : `text-community-green-light`
          }
        >
          {data?.userByMail.firstname}
        </h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
