import React from "react";
import { User, UserDisplay, Video } from "@/types/types";

export const addUserDisplay = async (addDisplay: (video: UserDisplay) => void) => {
  const videoRef = await getCameraRef();
  if (videoRef) {
    const userDisplay: UserDisplay = {
      displayArray: [{ id: new Date().getTime() }, { ref: videoRef }] as [
        User,
        Video
      ],
    };
    addDisplay(userDisplay);
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
      console.error("Error accessing camera: ", err);
      return null;
    }
  };
