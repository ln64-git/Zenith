// home.tsx
"use client";
import React, { useEffect, useState } from "react";
import Display from "@/components/display/display";
import KeyboardShortcuts from "@/utils/keyboard-shortcuts";
import AnimatedBackground from "@/components/ui/animate-background";
import { colors } from "@/utils/colorUtils";
import { useDisplayStore } from "@/utils/display-store";
import { addUserDisplay } from "@/utils/user-display";

export default function Home() {
  const [color, setColor] = useState<string | null>(null);
  const store = useDisplayStore();

  useEffect(() => {
    if (!color) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setColor(randomColor);
      store.setUserColor(randomColor);
    }
  }, [color, store]);

  useEffect(() => {
    const addDisplay = async () => {
      await addUserDisplay(store.addDisplay);
    };
    addDisplay();
  }, [store]);

  if (!color) {
    return null; // or a loading indicator
  }

  return (
    <div className="relative h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex justify-center items-center overflow-hidden">
      <div className="relative z-10 w-full max-h-[85vh] max-w-[85vw] aspect-[4/3] flex justify-center items-center m-4 rounded-lg">
        <AnimatedBackground className=" rounded-lg" color={color}>
          {/* <Display /> */}
          <div className="p-10">hello</div>
        </AnimatedBackground>
      </div>
      <KeyboardShortcuts />
    </div>
  );
}
