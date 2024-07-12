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
      <div className="absolute flex h-full w-full flex-wrap">
        {videosArray.map((video: UserDisplay, index: number) => (
          <div
            key={index}
            className="relative flex-grow"
            style={{ width: `${100 / columns}%`, height: `${100 / rows}%` }}
          >
            <Camera />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="absolute z-10 h-full w-full">
      {splitScreen(localVideos)}
    </div>
  );
}
