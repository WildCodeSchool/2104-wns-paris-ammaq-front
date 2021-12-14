import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Trash } from "react-feather";
import { UserByMail } from "../../graphql/queries/user";
import { useAuth } from "../../context/auth-provider";
import { DeleteMessage } from "../../graphql/mutations/message";
import { MessagesByChannelQuery } from "../../graphql/queries/message";

type MessageBoxProps = {
  message?: string;
  userId?: string;
  channelId?: string;
};

const Message = ({
  message,
  userId,
  channelId,
}: MessageBoxProps): JSX.Element => {
  const { loading, data } = useQuery(UserByMail, {
    variables: { email: userId },
  });

  // const [deleteMessage] = useMutation(DeleteMessage, {
  //   refetchQueries: [
  //     { query: MessagesByChannelQuery, variables: { channelId } },
  //   ],
  // });

  const { token } = useAuth();

  // const handleDelete = (id: string) => {
  //   deleteMessage({ variables: { id } });
  // };

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
      <Trash />
    </div>
  );
};

export default Message;

// const useMutation = () => (
//   DeleteMessage: any,
//   arg1: { refetchQueries: { query: any; variables: { channelId: any } }[] }
// ): [any] => {
//   throw new Error("Function not implemented.");
// };
