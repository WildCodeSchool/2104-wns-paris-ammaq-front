/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import React, { useState } from "react";
import { matchPath, NavLink, useHistory, useLocation } from "react-router-dom";
import {
  Users,
  Book,
  Calendar,
  HelpCircle,
  ChevronLeft,
  Power,
} from "react-feather";
import { useAuth } from "../../context/auth-provider";
import { firstLetter, withoutFirst } from "../../utils/functions";

import "./mainNav.css";

const tabs = [
  {
    name: "Communauté",
    href: "/community",
    color: "bg-community",
    icon: <Users className="inline-block" size="32" />,
  },
  {
    name: "Bibliothèque",
    href: "/library",
    color: "bg-library",
    icon: <Book className="inline-block" size="32" />,
  },
  {
    name: "Agenda",
    href: "/agenda",
    color: "bg-agenda",
    icon: <Calendar className="inline-block" size="32" />,
  },
  {
    name: "Quiz",
    href: "/quiz",
    color: "bg-quizz",
    icon: <HelpCircle className="inline-block" size="32" />,
  },
];

const MainNav = (): JSX.Element => {
  const [nav, openNav] = useState(true);
  const { token, setToken } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const handleNav = () => {
    openNav(!nav);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(undefined);
    history.push("/login");
  };

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
              src={token?.avatar || ""}
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
            {firstLetter(token?.firstname || "")}
          </span>
          {withoutFirst(token?.firstname || "")}
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
            nav ? "rotate-180" : ""
          }`}
        />
      </button>

      <nav className="grid place-items-center mt-6">
        <ul className="text-main-white text-2xl">
          {tabs.map((tab) => {
            const isActive = matchPath(tab.href, {
              path: location.pathname,
              exact: true,
            });
            return (
              <NavLink
                key={tab.name}
                to={tab.href}
                className={`${
                  nav
                    ? "rounded-md shadow-channels m-4 w-64 h-16 flex justify-between cursor-pointer"
                    : ""
                }`}
                activeClassName={`shadow-pressed bg-pressed ${
                  nav ? "gradient-border" : ""
                }`}
              >
                <div
                  className={`grid place-content-center ${!nav ? "pt-4" : ""}`}
                >
                  <div
                    className={`rounded-full w-14 h-14 ml-1 shadow-circle grid place-items-center self-start ${
                      nav ? "ml-1" : "my-2"
                    }`}
                  >
                    <div
                      className={`rounded-full w-12 h-12 grid place-items-center cursor-pointer ${
                        tab.color
                      } ${
                        isActive
                          ? "shadow-buttonsPressed gradient-border gradient-border-round"
                          : ""
                      }`}
                    >
                      {tab.icon}
                    </div>
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
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default MainNav;
