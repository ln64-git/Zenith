"use client";
import { useEffect } from "react";
import { addDisplay } from "../components/display/add-display";
import { useStore } from "@/lib/user-store";

export function KeyboardShortcuts() {
  const displayStore = useStore();

  useEffect(() => {
    const handleKeyboardShortcut = async (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "x") {
        if (displayStore.userDisplayArray) {
          e.preventDefault();
          await addDisplay(displayStore.addDisplay);
        } else {
          displayStore.setUserDisplayArray([]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyboardShortcut);
    return () => {
      window.removeEventListener("keydown", handleKeyboardShortcut);
    };
  }, [displayStore]);

  return null;
}

export default KeyboardShortcuts;
