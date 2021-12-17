/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useMutation } from "@apollo/client";
import Joi from "joi";
import { X, Check } from "react-feather";
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
          className="text-main-white bg-main-darkgrey shadow-editMessage rounded-xl p-2"
        />
        <input type="hidden" {...register("channelId")} required />
        <input type="hidden" {...register("userId")} required />
        <input type="hidden" {...register("id")} required />
        <div className="flex justify-around">
          <div className="shadow-channels flex rounded-full w-8 h-8 justify-center items-center">
            <button
              type="submit"
              className="shadow-channels rounded-full w-6 h-6 justify-center items-center bg-community-green-light"
            >
              <Check className="w-4 m-auto text-main-darkgrey" />
            </button>
          </div>
          <div className="shadow-channels flex rounded-full w-8 h-8 justify-center items-center">
            <button
              type="button"
              onClick={() => close()}
              className="shadow-channels rounded-full w-6 h-6 justify-center items-center bg-main-red"
            >
              <X className="w-4 m-auto text-main-darkgrey" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditInput;
