"use client";
import { create } from "zustand";
import { UserDisplay } from "@/types/types";

export type UserGridStore = {
  userDisplayArray: Array<UserDisplay>;
  addDisplay: (video: UserDisplay) => void;
  setUserDisplayArray: (displayArray: Array<UserDisplay>) => void;
};

export const useDisplayStore = create<UserGridStore>((set, get) => ({
  userDisplayArray: [],
  addDisplay: (video) => {
    const state = get();
    const exists = state.userDisplayArray.some(
      (v) => v.displayArray[0].id === video.displayArray[0].id
    );
    if (!exists) {
      set({
        userDisplayArray: [...state.userDisplayArray, video],
      });
    }
  },
  setUserDisplayArray: (displayArray) =>
    set({ userDisplayArray: displayArray }),
}));
