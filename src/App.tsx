/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useLocation } from "react-router-dom";

import MainNav from "./components/MainNav";
import Page from "./components/Page";
import "./App.css";

export default function App(): JSX.Element {
  return (
    <div className="App bg-main-darkgrey flex h-screen">
      {useLocation().pathname !== "/login" ? (
        <>
          <MainNav />
          <Page />
        </>
      ) : (
        <Page />
      )}
    </div>
  );
}
