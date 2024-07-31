"use client";
import React, { useEffect, useState } from "react";
import Display from "@/components/display/display";
import KeyboardShortcuts from "@/utils/keyboard-shortcuts";
import { addDisplay } from "@/components/display/add-display";
import { colors } from "@/utils/color-utils";
import { useStore } from "@/lib/user-store";

export default function Home() {
  const [color, setColor] = useState<string | null>(null);
  const [cameraAccessed, setCameraAccessed] = useState<boolean>(false);
  const store = useStore();

  useEffect(() => {
    if (!color) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      store.setUserColor(randomColor);
      setColor(randomColor);
    }
  }, [color, store]);

  useEffect(() => {
    const addUserDisplay = async () => {
      if (!cameraAccessed) {
        const result = await addDisplay(store.addDisplay);
        if (result) {
          setCameraAccessed(true);
        } else {
          console.log("Failed to access the camera");
        }
      }
    };
    addUserDisplay();
  }, [store, cameraAccessed]);

  return (
    <div className="relative h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex justify-center items-center overflow-hidden">
      <div className="relative z-10 w-full max-h-[85vh] max-w-[85vw] aspect-[4/3] flex justify-center items-center m-4 rounded-lg">
        {/* <AnimatedBackground className="rounded-lg" initialColor={color}> */}
        {cameraAccessed ? <Display /> : <div>No camera detected</div>}
        {/* </AnimatedBackground> */}
      </div>
      <KeyboardShortcuts />
    </div>
  );
}
