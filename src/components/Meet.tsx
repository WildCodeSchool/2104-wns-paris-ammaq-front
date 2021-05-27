import React, { useState } from "react";
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
  id: string;
  parentNode?: string;
  domain?: string;
  roomName: string;
  displayName: string;
  password?: undefined;
  subject: string;
  width: number;
  height: number;
  // invitees: Record<string, >;
  // userInfo: Record<string, >;
  devices: any;
  inviteUrl: string;
}

const Meet: React.FC<Room> = (config: Room) => {
  const { error, onAPILoad } = useJitsi(config);

  const [devices, setDevices] = useState({});
  const [streamUrl, setStreamUrl] = useState({});
  const [isRecording, setRecording] = useState(false);
  const [captureScreenshot, setCaptureScreenshot] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState("");

  onAPILoad().then((api: any) => {
    console.log(api.getVideoQuality());

    api.getCurrentDevices().then((devices: any) => {
      setDevices(devices);
      console.log(devices);
    });

    api.getLivestreamUrl().then((data: any) => {
      setStreamUrl(data);
    });

    if (isRecording) {
      api.executeCommand("startRecording", {
        mode: "file",
        shouldShare: true,
        rtmpStreamKey: "",
        rtmpBroadcastID: "",
      });
    }

    if (captureScreenshot) {
      api.captureLargeVideoScreenshot().then((data: any) => {
        setScreenshotUrl(data.dataURL);
      });
    }
  });

  return !error ? (
    <>
      <div id={config.parentNode} />
      <p>{!streamUrl ? null : streamUrl}</p>
      <button onClick={() => setRecording(!isRecording)}>
        toggle recording
      </button>
      <button onClick={() => setCaptureScreenshot(!captureScreenshot)}>
        capture screenshot
      </button>
      <p>{!screenshotUrl ? null : screenshotUrl}</p>
    </>
  ) : (
    <p>{error}</p>
  );
};

export default Meet;
