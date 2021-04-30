import React from "react";
import UserNav from "./components/UserNav/index";
import MainNav from "./components/MainNav";
import "./App.css";

function App(): JSX.Element {
  return (
    <div className="App bg-main-darkgrey">
      <UserNav />
      <MainNav />
    </div>
  );
}

export default App;
