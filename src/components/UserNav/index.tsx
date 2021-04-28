import React, { useState } from "react";
import "./userNav.css";
import { Users } from "react-feather";

const UserNav = (): JSX.Element => {
  const [close, setClose] = useState(false);
  const handleClick = () => {
    if (!close) {
      setClose(true);
    } else {
      setClose(false);
    }
  };
  return (
    <div className="md:flex flex-col md:flex-row min-h-screen w-full relative bg-darkgray">
      <div
        id="user-nav"
        className={`mt-2 mr-3 flex flex-col text-gray-700 flex-shrink-0 nav-user-bg absolute inset-y-0 right-0 nav-user-bs ${
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
          className="focus:outline-none outline-none text-white no-underline absolute user-nav-btn"
          onClick={handleClick}
        >
          {close ? ">" : "<"}
        </button>

        {
          // users
        }

        <div
          className={`mt-5 ml-3 grid grid-flow-col ${
            close ? " pt-2" : "  p-2"
          }`}
        >
          <img
            className="user-nav-img rounded-full object-cover z-10"
            src="https://cqfd.univ-lyon1.fr/files/2020/04/3-pieuvre-gif.gif"
            alt=""
          />
          <p
            className={`uppercase text-xs text-gray-300 items-end truncate ml-3 self-center ${
              close ? " hidden" : "laptop:hidden"
            }`}
          >
            Mohammed
          </p>
        </div>

        <div
          className={`mt-5 ml-3 grid grid-flow-col ${
            close ? " pt-2" : "  p-2"
          }`}
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
    </div>
  );
};
export default UserNav;
