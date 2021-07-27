import React from "react";

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
};

interface IUserProps {
  close: boolean;
  firstname: string;
  lastname: string;
  avatar: string;
}
const UserSmallCard = ({
  close,
  firstname,
  lastname,
  avatar,
}: IUserProps): JSX.Element => {
  return (
    <div
      data-testid="userSmallCard"
      className={`mt-5 ml-3 grid grid-flow-col 
      ${close ? "pt-2 mx-auto" : "p-2"}`}
    >
      <img
        className="user-nav-img rounded-full object-cover z-10 bg-usersnav shadow-profile"
        src={avatar}
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
