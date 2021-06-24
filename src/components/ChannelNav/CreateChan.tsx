/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { XCircle } from "react-feather";
import { CreateChannel } from "../../graphql/mutations/channel";

type CreateChanProps = {
  closeModal: any;
};

const CreateChan = ({ closeModal }: CreateChanProps): JSX.Element => {
  const [chanName, setChanName] = useState("");
  const [chanType, setChanType] = useState(true);
  const [createChannel] = useMutation(CreateChannel);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) =>
    createChannel({
      variables: {
        data,
      },
    });

  const handleChanName = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setChanName(event.target.value);
  };

  const handleChanType = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    console.log(event.target.value);
    event.target.value === "video" ? setChanType(false) : setChanType(true);
  };

  useEffect(() => {
    console.log(chanType);
  });

  return (
    <div className="absolute z-10 w-80 h-56 left-1/4 bg-main-darkgrey rounded-2xl p-4 text-main-white border-community-green-light border-solid border-2">
      <button type="button" onClick={closeModal} className="ml-64">
        <XCircle color="red" />
      </button>
      <div>
        <h1 className="text-center text-base">Créer un nouveau channel</h1>
      </div>
      <form className="p-2 flex flex-col">
        <input
          type="text"
          placeholder="nom-du-nouveau-channel"
          className="p-2 bg-main-darkgrey focus:outline-none border-solid border border-main-darkgrey focus:border-community-green-light"
          {...register("name")}
        />
        <div className="mt-2">
          <p>
            <span className="text-community-green-light">{register.name}</span>
            est un channel audio ou vidéo ?
          </p>
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              id="toggle"
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              {...register("isVocal")}
            />
            <label
              htmlFor="toggle"
              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            />
          </div>
        </div>
        <button type="submit" onSubmit={handleSubmit(onSubmit)}>
          Créer
        </button>
      </form>
    </div>
  );
};

export default CreateChan;
