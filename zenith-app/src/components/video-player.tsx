"use client";
import React, { useEffect, useState } from "react";
import { useDisplayStore } from "../utils/display-store";
import { UserDisplay } from "@/types/types";
import Camera from "./camera/camera";

export default function VideoPlayer() {
  const [localVideos, setLocalVideos] = useState<UserDisplay[]>([]);
  const displayStore = useDisplayStore();

  useEffect(() => {
    setLocalVideos(displayStore.userDisplayArray);
  }, [displayStore.userDisplayArray]);

  const splitScreen = (videosArray: UserDisplay[]) => {
    const numVideos = videosArray.length;
    const columns = Math.ceil(Math.sqrt(numVideos));
    const rows = Math.ceil(numVideos / columns);

    return (
      <div className="absolute flex flex-col h-full w-full">
        {Array.from({ length: rows }).map((_, rowIndex) => {
          const start = rowIndex * columns;
          const rowItems = videosArray.slice(start, start + columns);
          return (
            <div
              key={rowIndex}
              className="flex w-full justify-center"
              style={{
                height: `${100 / rows}%`,
              }}
            >
              {rowItems.map((video: UserDisplay, index: number) => (
                <div
                  key={index}
                  className="relative flex justify-center items-center"
                  style={{
                    width: `${100 / columns}%`,
                    margin: 0,
                    padding: 0,
                  }}
                >
                  <Camera />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="absolute z-10 h-full w-full m-0 p-0">
      {splitScreen(localVideos)}
    </div>
  );
}
