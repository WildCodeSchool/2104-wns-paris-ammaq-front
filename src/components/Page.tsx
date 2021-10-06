import React from "react";
import { Route } from "react-router-dom";

import Community from "./Community";
import Agenda from "./Agenda";
import Library from "./Library";
import Quizz from "./Quizz";
import Dashboard from "./Dashboard";
import AddUser from "./AddUserForm";
import Login from "./Login";

const Page = ({ setLogged }: any, { logged }: any): JSX.Element => {
  return (
    <>
      {logged ? (
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
          <Route path="/add-user" exact>
            <AddUser />
          </Route>
        </>
      ) : (
        <Route path="/login" exact>
          <Login setLogged={setLogged} />
        </Route>
      )}
    </>
  );
};

export default Page;
