"use client";
import DisplayGrid from "@/components/display-grid";
import KeyboardShortcuts from "@/utils/keyboard-shortcuts";

export default function Home() {
  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden">
      <DisplayGrid />
      <KeyboardShortcuts />
    </div>
  );
}
