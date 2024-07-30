"use client";
import React, { useEffect, useState } from "react";
import { useDisplayStore } from "../../utils/display-store";
import { UserDisplay } from "@/types/types";
import Camera from "../camera/camera";

export default function Display() {
  const [localVideos, setLocalVideos] = useState<UserDisplay[]>([]);
  const [movement, setMovement] = useState<number>(0);
  const displayStore = useDisplayStore();

  useEffect(() => {
    setLocalVideos(displayStore.userDisplayArray);
  }, [displayStore.userDisplayArray]);

  const handleMovement = (newMovement: number) => {
    setMovement(newMovement);
  };

  return (
    <>
      {localVideos.length > 0 && (
        <div>
          {movement != 0 && (
            <div className="absolute p-2 px-4 z-20 text-black">{movement}</div>
          )}
          <div className=" h-full flex justify-center items-center">
            <Camera onMovement={handleMovement} />
          </div>
        </div>
      )}
    </>
  );
}
