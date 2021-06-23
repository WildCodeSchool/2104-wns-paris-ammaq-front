import React from "react";
import { useJitsi } from "react-jutsu";
import MeetType from "../types/Meet";

const Meet = (config: MeetType): JSX.Element => {
  const { loading, error } = useJitsi(config);

  return (
    <>
      {error && <p>Error : {error}</p>}
      {loading && <p>Loading</p>}
      <div id={config.parentNode} />
    </>
  );
};

export default Meet;
