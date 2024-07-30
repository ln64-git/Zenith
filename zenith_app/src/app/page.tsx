"use client";
import React, { useEffect } from "react";
import Display from "@/components/display/display";
import KeyboardShortcuts from "@/utils/keyboard-shortcuts";
import AnimatedBackground from "@/components/ui/animate-background";
import { colors } from "@/utils/colorUtils";
import { useDisplayStore } from "@/utils/display-store";
import { addUserDisplay } from "@/utils/user-display";

// Define a fixed color to be used for the server-side render
const serverColor = colors[0];

export default function Home() {
  const store = useDisplayStore();
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  store.setUserColor(randomColor);
  const displayStore = useDisplayStore();

  useEffect(() => {
    const addDisplay = async () => {
      await addUserDisplay(displayStore.addDisplay);
    };
    addDisplay();
  }, []);

  return (
    <div className="relative h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex justify-center items-center overflow-hidden">
      <div className="relative z-10 w-full max-h-[85vh] max-w-[85vw] aspect-[4/3] flex justify-center items-center m-4 rounded-lg">
        <AnimatedBackground
          initialColor={
            typeof window === "undefined" ? serverColor : randomColor
          }
          className="h-full rounded-lg"
        >
          <Display />
        </AnimatedBackground>
      </div>
      <KeyboardShortcuts />
    </div>
  );
}
