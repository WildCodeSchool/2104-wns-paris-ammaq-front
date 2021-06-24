/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";

import { XCircle } from "react-feather";
import { CreateChannel } from "../../graphql/mutations/channel";

type CreateChanProps = {
  closeModal: any;
};

const CreateChan = ({ closeModal }: CreateChanProps): JSX.Element => {
  const [chanName, setChanName] = useState("");
  const [chanType, setChanType] = useState(true);
  const [createChannel] = useMutation(CreateChannel);

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

  const handleSubmit = () => {
    createChannel({
      variables: {
        name: chanName,
        isVocal: chanType,
      },
    });
    setChanName("");
    setChanType(true);
    closeModal();
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
          onChange={handleChanName}
        />
        <div className="mt-2">
          <p>
            <span className="text-community-green-light">{chanName}</span> est
            un channel audio ou vidéo ?
          </p>
          <div className="flex justify-evenly">
            <div>
              <input
                type="radio"
                value="audio"
                name="type"
                onChange={handleChanType}
              />
              <label htmlFor="audio">Audio</label>
            </div>
            <div>
              <input
                type="radio"
                value="video"
                name="type"
                onChange={handleChanType}
              />
              <label htmlFor="video">Vidéo</label>
            </div>
          </div>
        </div>
        <button type="button" onClick={handleSubmit}>
          Créer
        </button>
      </form>
    </div>
  );
};

export default CreateChan;
