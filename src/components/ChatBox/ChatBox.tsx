/* eslint-disable react/jsx-props-no-spreading */
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import React, { useState } from "react";
import { Send } from "react-feather";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { SubmitHandler, useForm } from "react-hook-form";
import { MessagesByChannelQuery } from "../../graphql/queries/message";
import MessageType from "../../types/Message";
import Message from "./Message";
import {
  CreateMessage,
  NEWMESSAGE_SUBSCRIPTION,
  DELETE_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION,
} from "../../graphql/mutations/message";
import { useAuth } from "../../context/auth-provider";

type ChatBoxProps = {
  channelId: string;
  channelName: string;
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

const ChatBox = ({ channelId, channelName }: ChatBoxProps): JSX.Element => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  useQuery(MessagesByChannelQuery, {
    variables: { channelId },
    onCompleted({ messagesByChannelId }) {
      console.log("messages from query", messagesByChannelId);
      setMessages([...messages, ...messagesByChannelId]);
    },
  });

  const [createMessage] = useMutation(CreateMessage);

  useSubscription(NEWMESSAGE_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData: result }) => {
      setMessages([...messages, result.data.newMessage]);
    },
  });

  useSubscription(DELETE_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData: result }) => {
      const messageId = result.data.deletedMessage;
      const newMessages = messages.filter((message) => {
        return message.id !== messageId;
      });
      setMessages(newMessages);
    },
  });

  useSubscription(UPDATE_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData: result }) => {
      console.log("update subscription", result.data.updatedMessage);
      const messageId = result.data.updatedMessage;
      const messageIndex = [...messages].findIndex(
        (x) => x.id === messageId.id
      );
      messages[messageIndex] = messageId;
      setMessages([...messages]);
    },
  });

  const { token } = useAuth();

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

  return (
    <div className="p-5 pl-0 w-full h-full">
      <div className="h-5/6 overscroll-y-auto p-4 flex flex-col place-content-end">
        {messages.length < 1 && <div>Pas encore de messages</div>}
        {messages.length > 0 &&
          messages.map((message: MessageType) => {
            return (
              <div
                key={message.id}
                className={`${
                  message.userId === token?.email ? "place-self-end mr-4" : null
                }`}
              >
                <Message
                  message={message.content}
                  userId={message.userId}
                  updatedAt={message.updatedAt}
                  createdAt={message.createdAt}
                  messageId={message.id}
                  channelId={channelId}
                />
              </div>
            );
          })}
      </div>

      <form className="w-full p-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder={`Envoyer un message dans #${channelName}`}
          className="shadow-pressed w-4/5 p-3 rounded-xl bg-main-darkgrey text-white placeholder-white placeholder-opacity-20 focus:outline-none focus:border-solid focus:border-2 focus:border-community-green-light"
          {...register("content")}
          required
        />
        <input type="hidden" {...register("channelId")} required />
        <input type="hidden" {...register("userId")} required />
        <button
          type="submit"
          className="w-12 h-12 m-2 shadow-profile rounded-full border-solid border-2 border-community-green-light"
        >
          <Send className="m-auto text-community-green-light" />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
