import { useQuery } from "@apollo/client";
import React from "react";
import { UserByMail } from "../../graphql/queries/user";

type MessageBoxProps = {
  message: string;
  user?: string;
};

const Message = ({ message, user }: MessageBoxProps): JSX.Element => {
  const { loading, error, data } = useQuery(UserByMail, {
    variables: { email: user },
  });

  return (
    <div className="flex text-white">
      {loading && <h1>Loading</h1>}
      <img
        className="w-8 h-8 rounded-full"
        src={data?.userByMail.avatar}
        alt="avatar"
      />
      <div>
        <h3 className="text-community-green-light">
          {data?.userByMail.firstname}
        </h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
