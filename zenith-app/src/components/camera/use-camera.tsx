"use client";
import { useEffect, useRef } from "react";

const useCamera = (): React.RefObject<HTMLVideoElement> => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        console.log("stream: ", stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        } else {
          console.log("videoRef.current is null");
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    };

    getCameraStream();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return videoRef;
};

export default useCamera;
