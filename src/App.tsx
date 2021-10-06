/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";

import MainNav from "./components/MainNav";
import Page from "./components/Page";
import "./App.css";

export default function App(): JSX.Element {
  const [logged, setLogged] = useState(false);

  return (
    <div className="App bg-main-darkgrey flex">
      {logged ? (
        <>
          <MainNav setLogged={setLogged} logged={logged} />
          <Page setLogged={setLogged} logged={logged} />
        </>
      ) : (
        <Page setLogged={setLogged} />
      )}
    </div>
  );
}
