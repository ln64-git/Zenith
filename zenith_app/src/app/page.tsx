import React from "react";
import Display from "@/components/display/display";
import KeyboardShortcuts from "@/utils/keyboard-shortcuts";
import AnimatedBackground from "@/components/animate-background";
import { colors } from "@/utils/colorUtils"; // Adjusted import

export default function Home() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex justify-center items-center overflow-hidden">
      <div className="w-full max-w-screen-lg max-h-screen aspect-video flex justify-center items-center p-4 box-border">
        <AnimatedBackground
          initialColor={randomColor}
          className="w-full h-full aspect-video rounded-md"
        >
          <Display />
        </AnimatedBackground>
      </div>
      <KeyboardShortcuts />
    </div>
  );
}
