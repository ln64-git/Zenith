"use client";
import React, { useEffect } from "react";
import { useDisplayStore } from "@/utils/display-store";
import { addUserDisplay } from "./user-display";

export function KeyboardShortcuts() {
  const displayStore = useDisplayStore();

  useEffect(() => {
    const handleKeyboardShortcut = async (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "x") {
        if (displayStore.userDisplayArray) {
          e.preventDefault();
          await addUserDisplay(displayStore.addDisplay);
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
