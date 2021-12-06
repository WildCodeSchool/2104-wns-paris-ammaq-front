import React, { useEffect } from "react";

import { getMonthName } from "../utils/timeFunctions";

const Dashboard = (): JSX.Element => {
  const today = new Date();
  const currentTime = () => {
    return today.toLocaleTimeString();
  };
  const timePlaying = setInterval(currentTime, 1000);
  const currentDate = `${today.getDate()} ${getMonthName(
    today
  )} ${today.getFullYear()}`;

  return (
    <div>
      <h1>
        Hello <span>Alicia</span>
      </h1>
      <div>
        <p>
          Aujourd&rsquo;hui tu as <span>2</span> cours de prévus
        </p>
        <div>
          <h3>{currentDate}</h3>
          <h3>{timePlaying}</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
