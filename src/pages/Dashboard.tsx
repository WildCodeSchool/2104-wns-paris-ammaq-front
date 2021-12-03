import React, { useEffect } from "react";

import { getFullMinutes, getMonthName } from "../utils/timeFunctions";

const Dashboard = (): JSX.Element => {
  const today = new Date();
  const currentTime = `${today.getHours()}:${getFullMinutes(today)}`;
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
          <h3>{currentTime}</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
