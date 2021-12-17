/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { useHistory } from "react-router-dom";
import CategoryType from "../../types/Category";

const Category = ({ id, name, media, sources }: CategoryType): JSX.Element => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/library/${id}`);
  };

  return (
    <div
      className="shadow-circle py-6 px-16 flex flex-col justify-center items-center hover:shadow-pressed"
      onClick={() => handleClick()}
    >
      <div className="bg-circle shadow-profile p-2.5 rounded-full mx-auto">
        <div className="rounded-full bg-community-blue p-2 h-28 w-28">
          <img
            className="rounded-full bg-main-darkgrey h-full w-full object-cover"
            src={media}
            alt={name}
          />
        </div>
      </div>
      <h2 className="text-2xl text-white font-bold tracking-wide">{name}</h2>
      <p className="text-community-blue font-semibold mt-4">
        {sources.length} ressource{sources.length > 1 && "s"}
      </p>
    </div>
  );
};

export default Category;
