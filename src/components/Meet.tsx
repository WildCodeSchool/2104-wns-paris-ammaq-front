import React from "react";
import { useJitsi } from "react-jutsu";

/* TODOS:
  - Check for role permissions and add them as a props
  - Add more props (subject, user info, devices, etc)
  - Add loading/error component
  - Encrypt password
  - Add number of participants
  Useful link: https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe
*/
interface Room {
  parentNode: string;
  domain?: string;
  roomName: string;
  displayName: string;
  password?: undefined;
  subject: string;
  width?: number;
  height: number;
  // invitees: undefined;
  // devices: Record<string, unknown>;
  // userInfo: Record<string, unknown>;
}

const Meet: React.FC<Room> = (config: Room) => {
  const { error } = useJitsi(config);
  return !error ? <div id={config.parentNode} /> : <p>{error}</p>;
};

export default Meet;
