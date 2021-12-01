/* eslint-disable react/jsx-props-no-spreading */
import React, { Fragment, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@apollo/client";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Trash } from "react-feather";
import ChannelType from "../../types/Channel";
import { ChannelsQuery } from "../../graphql/queries/channel";
import { DeleteChannel, UpdateChannel } from "../../graphql/mutations/channel";
import "./channels.css";

type EditModalProps = {
  channel: ChannelType;
  open: boolean;
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

const EditModal = ({
  channel,
  open,
  closeModal,
}: EditModalProps): JSX.Element => {
  const [check, setCheck] = useState(false);
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
    formState: { errors },
  } = useForm<FormValues>({
    resolver: joiResolver(schema),
    defaultValues: { name: channel.name, isVocal: channel.isVocal },
  });

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    updateChannel({ variables: { id: channel.id, input } });
    reset();
    closeModal();
  };

  const handleDelete = () => {
    deleteChannel({ variables: { id: channel.id } });
    setCheck(false);
    closeModal();
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        open={open}
        onClose={closeModal}
        className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center bg-main-darkgrey/50 text-center"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

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
                    <span className="text-main-orange">{channel.name}</span>?
                  </h2>
                  <div className="flex flex-row justify-around">
                    <button
                      type="button"
                      className="text-main-red"
                      onClick={handleDelete}
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
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditModal;
