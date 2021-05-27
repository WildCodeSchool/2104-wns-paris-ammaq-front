import React from "react";

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
};

interface IUserProps {
  close: boolean;
  firstname: string;
  lastname: string;
}
const UserSmallCard = ({
  close,
  firstname,
  lastname,
}: IUserProps): JSX.Element => {
  return (
    <div
      className={` mt-5 grid grid-flow-col ${close ? "pt-2 mx-auto" : "p-2"}`}
    >
      <img
        className="user-nav-img rounded-full object-cover z-10"
        src="https://cqfd.univ-lyon1.fr/files/2020/04/3-pieuvre-gif.gif"
        alt=""
      />
      <p
        className={`uppercase text-xs text-gray-300 items-end truncate ml-3 self-center ${
          close ? " hidden" : ""
        }`}
      >
        {firstname} {lastname}
      </p>
    </div>
  );
};

export default UserSmallCard;
