/* eslint-disable react/jsx-props-no-spreading */
import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { SubmitHandler, useForm } from "react-hook-form";
import { Trash } from "react-feather";
import { MessagesByChannelQuery } from "../../graphql/queries/message";
import MessageType from "../../types/Message";
import Message from "./Message";
import { CreateMessage, DeleteMessage } from "../../graphql/mutations/message";
import { useAuth } from "../../context/auth-provider";

type ChatBoxProps = {
  channelId: string;
};

type FormValues = {
  content: string;
  channelId: string;
  userId: string;
};

const schema = Joi.object({
  content: Joi.string().required(),
  channelId: Joi.string().required(),
  userId: Joi.string().required(),
});

const ChatBox = ({ channelId }: ChatBoxProps): JSX.Element => {
  const [createMessage] = useMutation(CreateMessage, {
    refetchQueries: [
      { query: MessagesByChannelQuery, variables: { channelId } },
    ],
  });

  const [deleteMessage] = useMutation(DeleteMessage, {
    refetchQueries: [
      { query: MessagesByChannelQuery, variables: { channelId } },
    ],
  });

  const { token } = useAuth();

  const { loading, error, data } = useQuery(MessagesByChannelQuery, {
    variables: { channelId },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: joiResolver(schema),
    defaultValues: { channelId, userId: token?.email },
  });

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    createMessage({ variables: { input } });
    reset();
  };

  const handleDelete = (id: string) => {
    deleteMessage({ variables: { id } });
  };

  return (
    <div className="h-full p-5 pl-0">
      <div>
        {data?.messagesByChannelId.length < 1 && (
          <div>Pas encore de messages</div>
        )}
        {data &&
          data?.messagesByChannelId.map((message: MessageType) => {
            return (
              <div>
                <Message
                  key={message.id}
                  message={message.content}
                  user={message.userId}
                />
                {message.userId === token?.email && (
                  <Trash onClick={() => handleDelete(message.id)} />
                )}
              </div>
            );
          })}
      </div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Envoyer un message dans #"
          className="shadow-channels px-6 py-3 rounded-xl bg-main-lightgrey text-white placeholder-white placeholder-opacity-20"
          {...register("content")}
          required
        />
        <input type="hidden" {...register("channelId")} required />
        <input type="hidden" {...register("userId")} required />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default ChatBox;
