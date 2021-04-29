import React from "react";
import { Users, Book, Calendar, HelpCircle } from "react-feather";

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
  return (
    <div className="m-1 w-72 h-screen rounded-md bg-mainnav shadow-mainnav">
      <div className="pt-4">
        <div className="w-36 h-36 rounded-full grid place-items-center bg-circle m-auto shadow-profile">
          <div className="w-32 h-32 m-auto grid place-items-center rounded-full bg-workit">
            <img
              src="/dumbo.jpeg"
              alt="profile pic"
              className="w-28 h-28 m-auto rounded-full"
            />
          </div>
        </div>
        <h3 className="text-main-white text-xl">
          <span className="text-transparent bg-workit bg-clip-text font-bold text-3xl">
            M
          </span>
          ohamed
        </h3>
      </div>

      <nav className="grid place-items-center mt-6">
        <ul className="text-main-white text-2xl">
          {tabs.map((tab) => (
            <div className="rounded-md shadow-channels my-4 w-64 h-16 flex justify-between cursor-pointer">
              <div className="grid place-content-center">
                <div className="rounded-full w-14 h-14 ml-1 shadow-circle grid place-items-center self-start">
                  <div
                    className={`rounded-full w-12 h-12 grid place-items-center cursor-pointer bg-${tab.color}`}
                  >
                    {tab.icon}
                  </div>
                </div>
              </div>
              <div className="grid place-items-center">
                <li className="pr-4">
                  <h2>{tab.name}</h2>
                </li>
              </div>
            </div>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MainNav;
