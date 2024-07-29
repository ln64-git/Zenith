"use client";
import React, { useEffect } from "react";
import { useDisplayStore } from "@/utils/display-store";
import { addUser } from "./users";

export function KeyboardShortcuts() {
  const displayStore = useDisplayStore();

  useEffect(() => {
    const handleKeyboardShortcut = async (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "x") {
        e.preventDefault();
        await addUser(displayStore.addDisplay);
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
