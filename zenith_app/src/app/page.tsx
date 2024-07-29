"use client";
import VideoPlayer from "@/components/video-player";
import KeyboardShortcuts from "@/utils/keyboard-shortcuts";

export default function Home() {
  return (
    <div className="h-screen">
      <VideoPlayer />
      <KeyboardShortcuts />
    </div>
  );
}
