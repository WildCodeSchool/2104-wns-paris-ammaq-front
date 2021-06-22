import React from "react";

import MainNav from "./components/MainNav";
import Page from "./components/Page";
import "./App.css";

export default function App(): JSX.Element {
  return (
    <div className="App bg-main-darkgrey flex">
      <MainNav />
      <Page />
    </div>
  );
}
