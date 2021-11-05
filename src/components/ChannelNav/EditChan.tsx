/* eslint-disable react/jsx-props-no-spreading */
import { useMutation } from "@apollo/client";
import { Edit2, Video } from "react-feather";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import { XCircle } from "react-feather";
import { UpdateChannel, DeleteChannel } from "../../graphql/mutations/channel";

import "./channels.css";

type CreateChanProps = {
  closeModal: () => void;
  id: number;
  chanName: string;
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
}: CreateChanProps): JSX.Element => {
  const [check, setCheck] = useState(false);
  const [createChannel] = useMutation(UpdateChannel);
  const [deleteChannel] = useMutation(DeleteChannel);

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

  const deleteChan = (chanId: number) => {
    deleteChannel({ variables: { id } });
    setCheck(false);
    closeModal();
  };

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
            pattern="[a-z0-9/-\]"
            minLength={3}
            maxLength={25}
            {...register("name")}
            required
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
          <button
            type="submit"
            className="shadow-channels text-community-green-light mt-4 rounded-xl text-m p-2"
          >
            valider
          </button>
        </div>
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
                  onClick={() => deleteChan(id)}
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
      </form>
    </div>
  );
};

export default EditChan;
