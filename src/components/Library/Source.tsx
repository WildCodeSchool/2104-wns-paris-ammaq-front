import React from "react";
import SourceType from "../../types/Source";

const Source = ({ link, description }: SourceType): JSX.Element => {
  return (
    <a
      className="shadow-circle py-6 px-16 flex flex-col justify-center items-center hover:shadow-pressed"
      href={link}
      target="_blank"
      rel="noreferrer noopener"
    >
      <h2 className="text-2xl text-white font-bold tracking-wide">
        {description}
      </h2>
      <p className="text-community-blue font-semibold mt-4">{link}</p>
    </a>
  );
};

export default Source;
