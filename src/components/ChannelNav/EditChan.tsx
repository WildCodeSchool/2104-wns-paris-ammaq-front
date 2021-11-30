/* eslint-disable react/jsx-props-no-spreading */
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import { XCircle } from "react-feather";
import { UpdateChannel, DeleteChannel } from "../../graphql/mutations/channel";
import { ChannelsQuery } from "../../graphql/queries/channel";

import "./channels.css";

type EditChanProps = {
  closeModal: () => void;
  id: string;
  chanName: string;
  isVocal: boolean;
};

type FormValues = {
  name: string;
  isVocal: boolean;
};

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(25).required(),
  isVocal: Joi.boolean().required(),
});

const EditChan = ({
  closeModal,
  id,
  chanName,
  isVocal,
}: EditChanProps): JSX.Element => {
  const [check, setCheck] = useState(false);

  const { loading, error, data } = useQuery(ChannelsQuery);
  const [updateChannel] = useMutation(UpdateChannel, {
    refetchQueries: [{ query: ChannelsQuery }],
  });
  const [deleteChannel] = useMutation(DeleteChannel, {
    refetchQueries: [{ query: ChannelsQuery }],
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: joiResolver(schema),
    defaultValues: { name: chanName, isVocal },
  });

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    console.log(input);
    updateChannel({ variables: { id, input } });
    reset();
    closeModal();
  };

  const deleteChan = () => {
    deleteChannel({ variables: { id } });
    setCheck(false);
    closeModal();
  };

  console.log(getValues());

  return (
    <div
      className="absolute z-10 w-80 h-auto left-1/4 bg-main-darkgrey rounded-2xl p-4 text-main-white border-solid border-2
      border-community-green-dark"
    >
      <button type="button" onClick={closeModal} className="ml-64">
        <XCircle color="red" />
      </button>
      <div>
        <h1 className="text-center text-base">Paramètres du channel</h1>
      </div>
      <form className="p-2 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <h3>Modifier le nom du channel</h3>
        <div>
          <input
            type="text"
            className="shadow-pressed bg-mainnav p-2 rounded outline-none"
            minLength={3}
            maxLength={25}
            {...register("name")}
            required
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
          <input type="hidden" {...register("isVocal")} required />
          <button
            type="submit"
            className="shadow-channels text-community-green-light mt-4 rounded-xl text-m p-2 focus:outline-none"
          >
            valider
          </button>
        </div>
      </form>
      <div>
        {check === false && (
          <button
            type="button"
            className="text-main-red"
            onClick={() => setCheck(true)}
          >
            Supprimer le channel
          </button>
        )}
        {check && (
          <div className="absolute w-80 h-auto bg-main-darkgrey rounded-2xl p-4 text-main-white border-solid border-2 border-main-red">
            <h2>
              Êtes-vous sûrs de vouloir supprimer{" "}
              <span className="text-main-orange">{chanName}</span>?
            </h2>
            <div className="flex flex-row justify-around">
              <button
                type="button"
                className="text-main-red"
                onClick={deleteChan}
              >
                Supprimer définitivement
              </button>
              <button
                type="button"
                className="text-community-green-light"
                onClick={() => setCheck(false)}
              >
                NAAOOONNN
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditChan;
