import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import "./userNav.css";
import { Users, ChevronLeft, ChevronRight } from "react-feather";
import UserSmallCard, { User } from "../Base/UserSmallCard";
import { UsersQuery } from "../../graphql/queries/user";

const UserNav = (): JSX.Element => {
  const { data } = useQuery(UsersQuery);
  const tooSmall = !(window.innerWidth > 1024);
  const [close, setClose] = useState(true);
  const handleClick = () => {
    setClose(!close && !tooSmall);
  };
  return (
    <div
      id="user-nav"
      data-testid="user-nav"
      className={`rounded mt-3 mr-3 flex flex-col flex-shrink-0 bg-usersnav absolute inset-y-0 right-0 shadow-usersnav ${
        close ? "p-4" : "w-1/12"
      }`}
    >
      {
        // title
      }
      <div
        className={`${
          close ? "flex text-center flex-col-reverse" : "text-center"
        }`}
      >
        <p className="mx-auto text-sm text-gray-300">5 </p>
        <span className="text-sm text-gray-300">
          {close ? <Users className="inline-block" /> : "Participants"}
        </span>
      </div>
      <button
        type="button"
        className={`focus:outline-none outline-none text-white no-underline absolute user-nav-btn ${
          tooSmall ? " hidden" : ""
        }`}
        onClick={handleClick}
      >
        {close ? <ChevronLeft /> : <ChevronRight />}
      </button>

      {data
        ? data.users.map((user: User) => (
            <UserSmallCard
              close={close}
              firstname={user.firstname}
              lastname={user.lastname}
              key={user.id}
            />
          ))
        : null}
    </div>
  );
};
export default UserNav;
