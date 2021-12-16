/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useMutation } from "@apollo/client";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateMessage } from "../../graphql/mutations/message";

type EditInputProps = {
  content?: string;
  id: string;
  channelId?: string;
  userId?: string;
  close: () => void;
};

type FormValues = {
  content: string;
  userId: string;
  channelId: string;
  id: string;
};

const schema = Joi.object({
  content: Joi.string().required(),
  userId: Joi.string().required(),
  channelId: Joi.string().required(),
  id: Joi.string().required(),
});

const EditInput = ({
  content,
  id,
  userId,
  channelId,
  close,
}: EditInputProps): JSX.Element => {
  const [updateMessage] = useMutation(UpdateMessage);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: joiResolver(schema),
    defaultValues: { content, userId, channelId, id },
  });

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    updateMessage({ variables: { input } });
    close();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("content")}
          required
          className="text-main-white bg-main-darkgrey shadow-pressed"
        />
        <input type="hidden" {...register("channelId")} required />
        <input type="hidden" {...register("userId")} required />
        <input type="hidden" {...register("id")} required />
        <button type="submit">modifier</button>
      </form>
      <button type="button" onClick={() => close()}>
        annuler
      </button>
    </div>
  );
};

export default EditInput;
