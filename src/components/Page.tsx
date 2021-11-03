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
    <Switch>
      <ProtectedRoute path="/" exact component={Dashboard} />
      <ProtectedRoute path="/community" exact component={Community} />
      <ProtectedRoute path="/agenda" exact component={Agenda} />
      <ProtectedRoute path="/library" exact component={Library} />
      <ProtectedRoute path="/quizz" exact component={Quizz} />
      <ProtectedRoute path="/add-user" exact component={AddUser} />
      <Route path="/login" exact component={Login} />
    </Switch>
  );
};

export default Page;
