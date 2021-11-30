/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@apollo/client";
import { Edit2, Video } from "react-feather";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import { XCircle } from "react-feather";
import { ChannelsQuery } from "../../graphql/queries/channel";
import { CreateChannel } from "../../graphql/mutations/channel";

import "./channels.css";

type CreateChanProps = {
  closeModal: () => void;
};

type FormValues = {
  name: string;
  isVocal: boolean;
};

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(25).required(),
  isVocal: Joi.boolean().required(),
});

const CreateChan = ({ closeModal }: CreateChanProps): JSX.Element => {
  const { loading, error, data } = useQuery(ChannelsQuery);
  const [createChannel] = useMutation(CreateChannel, {
    refetchQueries: [{ query: ChannelsQuery }],
  });
  const [channelName, setChannelName] = useState("");
  const [checked, setChecked] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: joiResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    createChannel({ variables: { input } });
    reset();
    closeModal();
  };

  return (
    <div
      className={`absolute z-10 w-80 h-auto left-1/4 bg-main-darkgrey rounded-2xl p-4 text-main-white border-solid border-2 ${
        checked ? "border-community-green-light" : "border-community-blue"
      }`}
    >
      <button type="button" onClick={closeModal} className="ml-64">
        <XCircle color="red" />
      </button>
      <div>
        <h1 className="text-center text-base">Créer un nouveau channel</h1>
      </div>
      <form className="p-2 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="shadow-pressed bg-mainnav p-2 rounded outline-none"
          pattern="[a-z0-9/-\]"
          minLength={3}
          maxLength={25}
          {...register("name")}
          onChange={(e: any) => setChannelName(e.currentTarget.value)}
          required
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
        <div className="mt-2">
          <div>
            <span
              className={`mr-1.5 ${
                checked ? "text-community-green-light" : "text-community-blue"
              }`}
            >
              {channelName}
            </span>
            <span>est un channel texte ou vidéo ?</span>
          </div>

          <div className="flex items-center justify-center w-full mt-4">
            <label
              htmlFor="toggleB"
              className="flex items-center cursor-pointer"
            >
              <div className="relative toggle-checkbox">
                <input
                  id="toggleB"
                  type="checkbox"
                  className="sr-only toggle-checkbox cursor-pointer"
                  {...register("isVocal")}
                  onChange={() => setChecked(!checked)}
                />
                <div className="block bg-mainnav w-14 h-8 rounded-full shadow-mainnav" />
                {checked ? (
                  <Edit2 className="absolute right-2 top-1 w-4 text-community-green-light" />
                ) : (
                  <Video className="absolute left-2 top-1 w-4 text-community-blue" />
                )}
                <div className="dot absolute left-1 top-1 w-6 h-6 rounded-full transition" />
                {errors.isVocal && (
                  <span className="text-red-500">{errors.isVocal.message}</span>
                )}
              </div>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="shadow-channels m-auto mt-4 rounded-xl w-24 text-m p-2"
        >
          Créer
        </button>
      </form>
    </div>
  );
};

export default CreateChan;
