import React, { useState } from "react";
import { matchPath, NavLink, useHistory, useLocation } from "react-router-dom";
import {
  Users,
  Book,
  Calendar,
  HelpCircle,
  ChevronRight,
  Power,
  Home,
} from "react-feather";
import classNames from "classnames";
import useSound from "use-sound";
import { useAuth } from "../../context/auth-provider";
import byeSound from "../../assets/bye.mp3";

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
  const [playBye] = useSound(byeSound, { volume: 0.25 });
  const [isExtended, toggleExtended] = useState(true);
  const { token, setToken } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const handleNav = () => {
    toggleExtended(!isExtended);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(undefined);
    playBye();
    history.push("/login");
  };

  return (
    <div
      className={classNames(
        "relative flex flex-col m-1 rounded-md bg-mainnav shadow-mainnav transition-all duration-500 ease-in-out",
        isExtended ? "w-72" : "w-24"
      )}
    >
      <div className="flex flex-col h-56 transition-all duration-500 ease-in-out">
        <div className="bg-circle shadow-profile p-2.5 rounded-full mx-auto">
          <div className="rounded-full bg-workit p-1">
            <img
              src={token?.avatar || ""}
              alt="profile pic"
              className={classNames(
                "m-auto rounded-full transition-all duration-500 ease-in-out",
                isExtended ? "h-28 w-28" : "h-14 w-14"
              )}
            />
          </div>
        </div>
        <div
          className={classNames(
            isExtended
              ? "flex justify-center items-center"
              : "flex flex-col jsutify-center items-center"
          )}
        >
          <h3
            className={classNames(
              "text-main-white text-center first-letter:text-transparent first-letter:bg-workit first-letter:bg-clip-text first-letter:font-bold transition-all duration-500 ease-in-out",
              isExtended
                ? "text-xl first-letter:text-3xl mr-2"
                : "text-xs first-letter:text-xl"
            )}
          >
            {token?.firstname}
          </h3>
          <NavLink to="/">
            <div
              className={classNames(
                "shadow-circle flex items-center justify-center rounded-full",
                isExtended ? "w-10 h-10" : "w-7 h-7"
              )}
            >
              <div
                className={classNames(
                  "flex items-center justify-center text-main-darkgrey bg-home p-1 rounded-full",
                  isExtended ? "w-8 h-8" : "w-5 h-5"
                )}
              >
                <Home />
              </div>
            </div>
          </NavLink>
        </div>

        <div className="mx-auto mt-4 p-1 shadow-profile rounded-full">
          <button
            type="button"
            onClick={handleLogout}
            className={classNames(
              "bg-logout text-main-white rounded-full grid place-items-center focus:outline-none transition-all duration-500 ease-in-out",
              isExtended ? "w-10 h-10" : "w-6 h-6"
            )}
          >
            <Power
              className={classNames(
                "text-shadow transition-all duration-500 ease-in-out",
                isExtended ? "w-8" : "w-4"
              )}
            />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleNav}
        className="absolute top-32 -right-5 w-10 h-10 bg-main-darkgrey rounded-full focus:outline-none shadow-mainnav"
      >
        <ChevronRight
          className={`inline-block text-main-white transtion-all duration-300 ease-in-out transform ${
            isExtended ? "rotate-180" : ""
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
                  isExtended
                    ? "rounded-md shadow-channels m-4 w-64 h-16 flex justify-between cursor-pointer"
                    : ""
                }`}
                activeClassName={`shadow-pressed bg-pressed ${
                  isExtended ? "gradient-border" : ""
                }`}
              >
                <div
                  className={`grid place-content-center ${
                    !isExtended ? "pt-4" : ""
                  }`}
                >
                  <div
                    className={`rounded-full w-14 h-14 ml-1 shadow-circle grid place-items-center self-start ${
                      isExtended ? "ml-1" : "my-2"
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
                  className={`${
                    isExtended ? "grid place-items-center" : "hidden"
                  }`}
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
