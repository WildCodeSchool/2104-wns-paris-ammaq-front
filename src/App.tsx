import React from "react";

import UserNav from "./components/UserNav/index";
import MainNav from "./components/MainNav";
import "./App.css";
import ChannelNav from "./components/ChannelNav";

export default function App(): JSX.Element {
  return (
    <div className="App">
      <ChannelNav />
      <UserNav />
      <MainNav />
    </div>
  );
}
