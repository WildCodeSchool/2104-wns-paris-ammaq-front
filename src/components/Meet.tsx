import React from "react";
import useJitsi from "../utils/useJitsi";
import MeetType from "../types/Meet";

const Meet = (config: MeetType): JSX.Element => {
  // const { loading, error, jitsi } = useJitsi(config);

  return (
    <>
      {/* {error && <p>Error : {error}</p>}
      {loading && <p>Loading</p>} */}
      <div id={config.parentNode} />
    </>
  );
};

export default Meet;
