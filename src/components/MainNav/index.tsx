import React from "react";

const tabs: string[] = ["Communauté", "Bibliothèque", "Agenda", "Quizz"];

const MainNav = (): JSX.Element => {
  return (
    <div>
      <ul>
        {tabs.map((tab) => (
          <li>{tab}</li>
        ))}
      </ul>
    </div>
  );
};

export default MainNav();
