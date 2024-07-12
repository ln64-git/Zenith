"use client";
import React, { forwardRef, useEffect, useRef, useImperativeHandle } from "react";

const Camera = forwardRef<HTMLVideoElement, React.HTMLProps<HTMLVideoElement>>((props, ref) => {
  const localRef = useRef<HTMLVideoElement>(null);

  useImperativeHandle(ref, () => localRef.current!);

  useEffect(() => {
    if (localRef.current) {
      localRef.current.onloadedmetadata = () => {
        localRef.current!.play();
      };
    }
  }, []);

  return (
    <div className="w-full h-full bg-black flex justify-center items-center">
      <video
        {...props}
        ref={localRef}
        autoPlay
        className="w-full h-full object-cover"
      ></video>
    </div>
  );
});

Camera.displayName = "Camera";

export default Camera;
