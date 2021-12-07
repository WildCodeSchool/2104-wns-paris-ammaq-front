/* eslint-disable react/jsx-props-no-spreading */
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import React, { useState } from "react";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { SubmitHandler, useForm } from "react-hook-form";
import { Trash } from "react-feather";
import { MessagesByChannelQuery } from "../../graphql/queries/message";
import MessageType from "../../types/Message";
import Message from "./Message";
import {
  CreateMessage,
  DeleteMessage,
  MESSAGES_SUBSCRIPTION,
} from "../../graphql/mutations/message";
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

type Message = {
  content?: string;
  channelId: string;
  id: string;
  userId: string;
};

const ChatBox = ({ channelId }: ChatBoxProps): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);

  useSubscription(MESSAGES_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData: result }) => {
      console.log(result);
      setMessages([...messages, result.data.newMessage]);
    },
  });

  const [createMessage] = useMutation(CreateMessage);

  const [deleteMessage] = useMutation(DeleteMessage, {
    refetchQueries: [
      { query: MessagesByChannelQuery, variables: { channelId } },
    ],
  });

  const { token } = useAuth();

  useQuery(MessagesByChannelQuery, {
    variables: { channelId },
    onCompleted({ messagesByChannelId }) {
      setMessages([...messages, ...messagesByChannelId]);
    },
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
        {messages.length < 1 && <div>Pas encore de messages</div>}
        {messages.length > 0 &&
          messages.map((message: Message) => {
            return (
              <div key={message.id}>
                <Message message={message.content} userId={message.userId} />
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
