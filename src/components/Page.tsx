import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Community from "./Community";
import Agenda from "./Agenda";
import Library from "./Library";
import Quizz from "./Quizz";
import Dashboard from "./Dashboard";
import AddUser from "./AddUserForm";
import Login from "./Login";

const Page = (): JSX.Element => {
  return (
    /* <>
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
        <>
          <Redirect to={{ pathname: "/login" }} />
          <Route path="/login" exact>
            <Login setLogged={setLogged} />
          </Route>
        </>
      )}
    </>
    */
    <Switch>
      <ProtectedRoute path="/" exact component={Dashboard} />
      <ProtectedRoute path="/community" exact component={Community} />
      <ProtectedRoute path="/agenda" exact component={Agenda} />
      <ProtectedRoute path="/library" exact component={Library} />
      <ProtectedRoute path="/quizz" exact component={Quizz} />
      <Route path="/login" exact component={Login} />
    </Switch>
  );
};

export default Page;
