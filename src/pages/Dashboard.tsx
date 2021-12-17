import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth-provider";

import { getMonthName } from "../utils/timeFunctions";

const Dashboard = (): JSX.Element => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const { token } = useAuth();

  const today = new Date();
  const currentDate = `${today.getDate()} ${getMonthName(
    today
  )} ${today.getFullYear()}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="w-screen">
      <h1 className="text-main-white text-center text-4xl pt-10">
        Hello
        <span className="bg-workit font-extrabold text-transparent bg-clip-text">
          {" "}
          {token?.firstname}
        </span>{" "}
        !
      </h1>
      <div className="text-center p-10 text-2xl flex flex-col items-center justify-center">
        <div className="shadow-circle p-10 w-96 rounded-md text-main-white">
          <h3>{currentDate}</h3>
          <h3 className="text-6xl text-bold bg-workit text-transparent bg-clip-text">
            {time}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
