import React from "react";
import { User, UserDisplay, Video } from "@/types/types";

export const addDisplay = async (
  addDisplay: (video: UserDisplay) => void
): Promise<boolean> => {
  const videoRef = await getCameraRef();
  if (videoRef) {
    const userDisplay: UserDisplay = {
      displayArray: [{ id: new Date().getTime() }, { ref: videoRef }] as [
        User,
        Video
      ],
    };
    addDisplay(userDisplay);
    return true;
  } else {
    console.log("No camera detected");
    return false;
  }
};

const getCameraRef =
  async (): Promise<React.RefObject<HTMLVideoElement> | null> => {
    const videoRef = React.createRef<HTMLVideoElement>();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        console.log(
          "videoRef.current after setting stream: ",
          videoRef.current
        );
      }
      return videoRef;
    } catch (err) {
      console.warn("Warning: Unable to access the camera. ", err);
      return null;
    }
  };

export default getCameraRef;
