import React from "react";

import MainNav from "./components/MainNav";
import "./App.css";
import Community from "./components/Community";

export default function App(): JSX.Element {
  return (
    <div className="App bg-main-darkgrey flex">
      <MainNav />
      <Community />
    </div>
  );
}
