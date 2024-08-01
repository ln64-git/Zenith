"use client";
import React, { useEffect, useState, useRef } from "react";
import Display from "@/components/display/display";
import KeyboardShortcuts from "@/utils/keyboard-shortcuts";
import { addDisplay } from "@/components/display/add-display";
import { colors } from "@/utils/color-utils";
import { useStore } from "@/lib/user-store";
import { startSession } from "@/utils/session";

export default function Home() {
  const [color, setColor] = useState<string | null>(null);
  const [cameraAccessed, setCameraAccessed] = useState<boolean>(false);
  const store = useStore();
  const sessionStarted = useRef(false); // Ref to track if session has started

  useEffect(() => {
    if (!color) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      store.setUserColor(randomColor);
      setColor(randomColor);
    }
  }, [color, store]);

  useEffect(() => {
    const addUserDisplay = async () => {
      if (!cameraAccessed && !sessionStarted.current) {
        const result = await addDisplay(store.addDisplay);
        if (result) {
          setCameraAccessed(true);
          startSession();
          sessionStarted.current = true;
        }
      }
    };
    addUserDisplay();
  }, [cameraAccessed, store]);

  return (
    <div className="relative h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex justify-center items-center overflow-hidden">
      <div className="relative z-10 w-full max-h-[85vh] max-w-[85vw] aspect-[4/3] flex flex-col justify-center items-center m-4 rounded-lg">
        {cameraAccessed ? <Display /> : <div>No camera detected</div>}
      </div>
      <KeyboardShortcuts />
    </div>
  );
}
