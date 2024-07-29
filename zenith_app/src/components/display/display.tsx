"use client";
import React, { useEffect, useState } from "react";
import { useDisplayStore } from "../../utils/display-store";
import { UserDisplay } from "@/types/types";
import Camera from "../camera/camera";

export default function Display() {
  const [localVideos, setLocalVideos] = useState<UserDisplay[]>([]);
  const [movement, setMovement] = useState<number>(0);
  const displayStore = useDisplayStore();
  if (localVideos != null) {
  }

  useEffect(() => {
    setLocalVideos(displayStore.userDisplayArray);
  }, [displayStore.userDisplayArray]);

  const handleMovement = (newMovement: number) => {
    setMovement(newMovement);
  };

  return (
    <>
      <div className="absolute z-20 text-black">Movement: {movement}</div>
      {localVideos.length > 0 && (
        <div className="aspect-video  flex justify-center items-center">
          <Camera onMovement={handleMovement} />
        </div>
      )}
    </>
  );
}