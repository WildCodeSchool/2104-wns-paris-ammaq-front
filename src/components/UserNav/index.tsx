import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import "./userNav.css";
import { Users, ChevronRight, Loader } from "react-feather";
import UserSmallCard from "../Base/UserSmallCard";
import UserSmallCardLoading from "../Base/UserSmallCardLoading";
import { UsersQuery } from "../../graphql/queries/user";
import User from "../../types/User";

const UserNav = (): JSX.Element => {
  const { data, loading, error } = useQuery(UsersQuery);
  const tooSmall = !(window.innerWidth > 1024);
  const [close, setClose] = useState(true);
  const handleClick = () => {
    setClose(!close && !tooSmall);
  };
  return (
    <div
      id="user-nav"
      data-testid="user-nav"
      className={`rounded mt-3 mr-3 flex flex-col flex-shrink-0 bg-usersnav relative inset-y-0 right-0 shadow-usersnav ${
        close ? "w-auto p-4" : "w-p10"
      }`}
    >
      <div
        className={`${
          close ? "flex text-center flex-col-reverse" : "text-center"
        }`}
      >
        <p className="mx-auto text-sm text-gray-300">
          {loading ? <Loader className="animate-spin ease-in-out" /> : null}
          {data ? data.users.length : null}
        </p>
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
        <ChevronRight
          className={`transtion-all duration-300 ease-in-out transform ${
            close && "-rotate-180"
          }`}
        />
      </button>
      {loading ? (
        <>
          <UserSmallCardLoading />
          <UserSmallCardLoading />
          <UserSmallCardLoading />
          <UserSmallCardLoading />
        </>
      ) : null}
      {error ? <p>error: {error}</p> : null}
      {data
        ? data.users.map((user: User) => (
            <UserSmallCard
              close={close}
              firstname={user.firstname}
              lastname={user.lastname}
              key={user.id}
              avatar={user.avatar}
            />
          ))
        : null}
    </div>
  );
};
export default UserNav;
