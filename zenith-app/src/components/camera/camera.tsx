"use client";
import React, { useEffect, useRef } from "react";

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const getCameraStream = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch((error) => {
            console.error("Error playing the video stream:", error);
          });
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    };

    getCameraStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  return <video ref={videoRef} className="h-full w-full " autoPlay muted />;
};

export default Camera;
