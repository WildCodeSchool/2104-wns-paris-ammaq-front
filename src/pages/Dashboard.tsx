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
    <div>
      <h1>
        Bonjour <span>{token?.firstname}</span>
      </h1>
      <div>
        <h3>
          Nous sommes le <span>{currentDate}</span>
        </h3>
        <h3>
          <span>{time}</span>
        </h3>
      </div>
    </div>
  );
};

export default Dashboard;
