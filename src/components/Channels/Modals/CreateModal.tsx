import { useMutation } from "@apollo/client";
import React, { ChangeEvent, Fragment, useState } from "react";
import { Edit2, Video } from "react-feather";
import { Dialog, Transition } from "@headlessui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { ChannelsQuery } from "../../../graphql/queries/channel";
import { CreateChannel } from "../../../graphql/mutations/channel";
import "../Channels.css";

type CreateModalProps = {
  closeModal: () => void;
  open: boolean;
};

type FormValues = {
  name: string;
  isVocal: boolean;
};

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(25).required(),
  isVocal: Joi.boolean().required(),
});

const CreateModal = ({ closeModal, open }: CreateModalProps): JSX.Element => {
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
    <Transition appear show={open} as={Fragment}>
      <Dialog
        open={open}
        onClose={closeModal}
        className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center bg-main-darkgrey/50 text-center"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div
            className={`inline-block w-full max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-main-darkgrey shadow-xl rounded-2xl border-solid border-2 ${
              checked ? "border-community-green-light" : "border-community-blue"
            }`}
          >
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-main-white"
            >
              Créer un salon
            </Dialog.Title>

            <Dialog.Description as="h4" className="text-main-white m-4">
              Veuillez entrer un nom de channel et définir son type.
            </Dialog.Description>

            <form
              className="p-2 flex flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                className="shadow-pressed bg-mainnav p-2 rounded outline-none text-main-white"
                pattern="[a-z0-9/-\]"
                minLength={3}
                maxLength={25}
                {...register("name")}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setChannelName(e.currentTarget.value)
                }
                required
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
              <div className="mt-2">
                <div>
                  <span
                    className={`mr-1.5 ${
                      checked
                        ? "text-community-green-light"
                        : "text-community-blue"
                    }`}
                  >
                    {channelName}
                  </span>
                  <span className="text-main-white">
                    est un channel{" "}
                    <span className="text-community-green-light">texte</span> ou{" "}
                    <span className="text-community-blue">vidéo</span> ?
                  </span>
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
                        <span className="text-red-500">
                          {errors.isVocal.message}
                        </span>
                      )}
                    </div>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="shadow-channels m-auto mt-4 rounded-xl w-24 text-m p-2 text-main-white"
              >
                Créer
              </button>
            </form>
            <button
              type="button"
              className="text-main-red border-solid border-2 border-main-red rounded-md p-1 mt-4"
              onClick={closeModal}
            >
              Annuler
            </button>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateModal;
