"use client";
import React from "react";
import { useDisplayStore } from "@/utils/display-store";
import { UserDisplay } from "@/types/types";
import Camera from "./camera/camera";

const DisplayGrid: React.FC = () => {
  const userDisplayArray = useDisplayStore((state) => state.userDisplayArray);

  const splitScreen = (displayArray: UserDisplay[]) => {
    const columns = Math.ceil(Math.sqrt(displayArray.length));
    return (
      <div className="absolute flex h-full w-full flex-wrap">
        {displayArray.map((display, index) => (
          <div
            key={index}
            className="relative flex-1"
            style={{
              flexBasis: `calc(${100 / columns}%)`,
              maxWidth: `calc(${100 / columns}%)`,
            }}
          >
            <Camera ref={display.displayArray[1].ref} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden">
      <div className="absolute z-10 h-full w-full">
        {splitScreen(userDisplayArray)}
      </div>
    </div>
  );
};

export default DisplayGrid;
