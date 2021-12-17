import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Community from "./Community";
import Agenda from "./Agenda";
import Library from "./Library";
import Sources from "./Sources";
import Quiz from "./Quiz";
import Dashboard from "./Dashboard";
import AddUser from "../components/AddUserForm";
import Login from "./Login";

const Page = (): JSX.Element => {
  return (
    <Switch>
      <ProtectedRoute path="/" exact component={Dashboard} />
      <ProtectedRoute path="/community" exact component={Community} />
      <ProtectedRoute path="/agenda" exact component={Agenda} />
      <ProtectedRoute path="/library" exact component={Library} />
      <ProtectedRoute path="/library/:id" exact component={Sources} />
      <ProtectedRoute path="/quiz" exact component={Quiz} />
      <ProtectedRoute path="/add-user" exact component={AddUser} />
      <Route path="/login" exact component={Login} />
    </Switch>
  );
};

export default Page;
