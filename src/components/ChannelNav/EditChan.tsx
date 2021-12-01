/* eslint-disable react/jsx-props-no-spreading */
import { useMutation, useQuery } from "@apollo/client";
import React, { Fragment, useRef, useState } from "react";
import { Trash } from "react-feather";
import { Dialog, Transition } from "@headlessui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import { XCircle } from "react-feather";
import { UpdateChannel, DeleteChannel } from "../../graphql/mutations/channel";
import { ChannelsQuery } from "../../graphql/queries/channel";

import "./channels.css";

type EditChanProps = {
  closeModal: () => void;
  openModal: () => void;
  open: boolean;
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
  openModal,
  open,
  id,
  chanName,
  isVocal,
}: EditChanProps): JSX.Element => {
  const [check, setCheck] = useState(false);
  const inputRef = useRef(null);

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

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        initialFocus={inputRef}
        as="div"
        open={open}
        onClose={closeModal}
        className="fixed flex justify-center items-center inset-0 z-10 overflow-y-auto bg-main-darkgrey bg-opacity-50 text-center"
      >
        <Dialog.Overlay className="fixed inset-0" />
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-main-darkgrey shadow-xl rounded-2xl border-solid border-2 border-community-green-dark">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-main-white"
          >
            Paramètres du salon
          </Dialog.Title>
          <Dialog.Description as="h4" className="text-main-white">
            Modifier le nom du channel
          </Dialog.Description>

          <form
            className="flex justify-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              ref={inputRef}
              type="text"
              className="shadow-pressed bg-mainnav p-2 rounded outline-none text-main-white"
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
          </form>

          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-main-white bg-main-darkgrey border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onClick={closeModal}
            >
              Annuler
            </button>
          </div>
          <div>
            {!check && (
              <button
                type="button"
                className="text-main-red shadow-channels p-2 text-center"
                onClick={() => setCheck(true)}
              >
                <Trash />
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
                    Annuler
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditChan;
