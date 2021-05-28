import React from "react";
import { Route } from "react-router-dom";

import Community from "./Community";
import Agenda from "./Agenda";
import Library from "./Library";
import Quizz from "./Quizz";
import Dashboard from "./Dashboard";

const Page = (): JSX.Element => {
  return (
    <>
      <Route path="/" exact>
        <Dashboard />
      </Route>
      <Route path="/community" exact>
        <Community />
      </Route>
      <Route path="/agenda" exact>
        <Agenda />
      </Route>
      <Route path="/library" exact>
        <Library />
      </Route>
      <Route path="/quizz" exact>
        <Quizz />
      </Route>
    </>
  );
};

export default Page;
