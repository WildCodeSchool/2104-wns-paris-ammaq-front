import React from "react";

import MainNav from "./components/MainNav";
import Community from "./components/Community";
import "./App.css";

export default function App(): JSX.Element {
  return (
    <div className="App bg-main-darkgrey flex">
      <MainNav />
      <Community />
    </div>
  );
}
