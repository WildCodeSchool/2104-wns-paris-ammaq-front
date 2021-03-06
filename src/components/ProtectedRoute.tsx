import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

const ProtectedRoute = ({ ...routeProps }: RouteProps): JSX.Element => {
  if (localStorage.token) {
    return <Route {...routeProps} />;
  }
  return <Redirect to={{ pathname: "/login" }} />;
};

export default ProtectedRoute;
