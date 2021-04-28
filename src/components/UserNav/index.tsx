import React, { useState } from "react";
import "./userNav.css";
import { Users, ChevronLeft, ChevronRight } from "react-feather";

const UserNav = (): JSX.Element => {
  const tooSmall = !(window.innerWidth > 1024);
  const [close, setClose] = useState(true);
  const handleClick = () => {
    setClose(!close && !tooSmall);
  };
  return (
    <div
      id="user-nav"
      className={`rounded mt-2 mr-3 flex flex-col flex-shrink-0 bg-usersnav absolute inset-y-0 right-0 shadow-usersnav ${
        close ? " p-4" : "  w-1/12"
      }`}
    >
      {
        // title
      }
      <div className={`${close ? "flex flex-col-reverse" : ""}`}>
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

      {
        // users
      }

      <div
        className={`mt-5 ml-3 grid grid-flow-col ${close ? " pt-2" : "  p-2"}`}
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
          Mohammed
        </p>
      </div>

      <div
        className={`mt-5 ml-3 grid grid-flow-col ${close ? " pt-2" : "  p-2"}`}
      >
        <img
          className="user-nav-img rounded-full object-cover z-10"
          src="https://www.lebernard.ca/wp-content/uploads/2015/09/Chien-chinois-a-crete.jpg"
          alt=""
        />
        <p
          className={`uppercase text-xs text-gray-300 items-end truncate ml-3 self-center ${
            close ? " hidden" : ""
          }`}
        >
          Chien Chinois à Crête
        </p>
      </div>
    </div>
  );
};
export default UserNav;
