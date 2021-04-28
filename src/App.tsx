import React from "react";
import "./App.css";
import Meet from "./components/Meet";

function App(): JSX.Element {
  return (
    <Meet
      parentNode="jitsi-container"
      roomName="ammaq"
      displayName="ammaq"
      subject="jitsi"
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
