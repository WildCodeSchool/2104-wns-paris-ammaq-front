import React from "react";
import UserNav from "./components/UserNav/index";
import "./App.css";

function App(): JSX.Element {
  return (
    <div className="App bg-main-darkgrey">
      <UserNav />
    </div>
  );
}

export default App;
