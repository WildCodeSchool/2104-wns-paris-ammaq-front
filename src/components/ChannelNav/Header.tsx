import React from "react";
import "./header.css";

const Header = (): JSX.Element => {
  return (
    <div className="h-52 flex flex-col ">
      <div className="rounded-full bg-white school-logo mx-auto shadow-profile bg-circle p-3">
        <div className="p-2 bg-community rounded-full">
          <img
            className="bg-white rounded-full p-1"
            src="https://avatars.githubusercontent.com/u/8874047?s=280&v=4"
            alt="logo de "
          />
        </div>
      </div>
      <div className="text-white font-bold text-center text-lg">
        <h3>Wild Code School</h3>
      </div>
    </div>
  );
};

export default Header;
