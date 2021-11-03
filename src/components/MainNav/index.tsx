/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  Users,
  Book,
  Calendar,
  HelpCircle,
  ChevronLeft,
  Power,
} from "react-feather";
import { useLazyQuery } from "@apollo/client";
import { UserByMail } from "../../graphql/queries/user";
import { firstLetter, withoutFirst } from "../../utils/functions";

import "./mainNav.css";

const tabs = [
  {
    name: "Communauté",
    color: "community",
    icon: <Users className="inline-block" size="32" />,
  },
  {
    name: "Bibliothèque",
    color: "library",
    icon: <Book className="inline-block" size="32" />,
  },
  {
    name: "Agenda",
    color: "agenda",
    icon: <Calendar className="inline-block" size="32" />,
  },
  {
    name: "Quizz",
    color: "quizz",
    icon: <HelpCircle className="inline-block" size="32" />,
  },
];

const MainNav = (): JSX.Element => {
  const [nav, openNav] = useState(true);
  const [firstname, setFirstname] = useState("");
  const [avatar, setAvatar] = useState("");

  const history = useHistory();

  const [getUser] = useLazyQuery(UserByMail, {
    onCompleted: (data) => {
      setFirstname(data.userByMail.firstname);
      setAvatar(data.userByMail.avatar);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleNav = () => {
    openNav(!nav);
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/login");
  };

  useEffect(() => {
    const userMail = localStorage.getItem("email");
    getUser({ variables: { email: userMail } });
  }, []);

  return (
    <div
      id="mainNav"
      className={`m-1 rounded-md bg-mainnav shadow-mainnav ${
        nav ? "w-72" : "w-24"
      }`}
    >
      <div className="pt-4">
        <div
          className={`rounded-full grid place-items-center bg-circle m-auto shadow-profile ${
            nav ? "w-36 h-36" : "w-20 h-20"
          }`}
        >
          <div
            className={`m-auto grid place-items-center rounded-full bg-workit ${
              nav ? "w-32 h-32" : "w-16 h-16"
            }`}
          >
            <img
              src={avatar}
              alt="profile pic"
              className={`m-auto rounded-full ${
                nav ? "w-28 h-28" : "w-14 h-14"
              }`}
            />
          </div>
        </div>
        <h3
          className={`text-main-white text-center ${
            nav ? "text-xl" : "text-xs"
          }`}
        >
          <span
            className={`text-transparent bg-workit bg-clip-text font-bold ${
              nav ? "text-3xl" : "text-xl"
            }`}
          >
            {firstLetter(firstname)}
          </span>
          {withoutFirst(firstname)}
        </h3>
      </div>

      <div
        className={`mt-4 grid place-items-center shadow-profile rounded-full m-auto ${
          nav ? "w-14 h-14" : "w-8 h-8"
        }`}
      >
        <button
          type="button"
          className={`bg-logout text-main-white rounded-full grid place-items-center focus:outline-none ${
            nav ? "w-10 h-10" : "w-6 h-6"
          }`}
          onClick={handleLogout}
        >
          <Power className={`text-shadow ${nav ? "w-8" : "w-4"}`} />
        </button>
      </div>

      <button
        type="button"
        onClick={handleNav}
        className={`w-10 h-10 bg-main-darkgrey rounded-full focus:outline-none shadow-mainnav absolute ${
          nav ? "nav-open" : "nav-closed"
        }`}
      >
        <ChevronLeft
          className={`inline-block text-main-white transtion-all duration-300 ease-in-out transform ${
            nav && "rotate-180"
          }`}
        />
      </button>

      <nav className="grid place-items-center mt-6">
        <ul className="text-main-white text-2xl">
          {tabs.map((tab) => (
            <>
              <NavLink
                to={`/${tab.color}`}
                className={`${
                  nav
                    ? "rounded-md shadow-channels m-4 w-64 h-16 flex justify-between cursor-pointer"
                    : ""
                }`}
                activeClassName={`${
                  nav
                    ? "shadow-pressed bg-pressed gradient-border "
                    : "shadow-pressed bg-pressed "
                }`}
                key={tab.name}
              >
                <div
                  className={`grid place-content-center ${!nav ? "pt-4" : ""}`}
                >
                  <div
                    className={`rounded-full w-14 h-14 ml-1 shadow-circle grid place-items-center self-start ${
                      nav ? "ml-1" : "my-2"
                    }`}
                  >
                    <NavLink
                      to={`/${tab.color}`}
                      activeClassName="shadow-buttonsPressed gradient-border gradient-border-round"
                      className={`rounded-full w-12 h-12 grid place-items-center cursor-pointer bg-${tab.color}`}
                      exact
                    >
                      {tab.icon}
                    </NavLink>
                  </div>
                </div>
                <div
                  className={`${nav ? "grid place-items-center" : "hidden"}`}
                >
                  <li className="pr-4">
                    <h2>{tab.name}</h2>
                  </li>
                </div>
              </NavLink>
            </>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MainNav;
