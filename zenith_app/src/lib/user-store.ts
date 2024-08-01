import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { UserDisplay } from "@/types/types";

let interval: NodeJS.Timeout | null = null;

export type Session = {
  count: number;
};

export type UserStore = {
  userColor: string;
  userDisplayArray: Array<UserDisplay>;
  session: Session | null;
  setUserColor: (color: string) => void;
  addDisplay: (video: UserDisplay) => void;
  setUserDisplayArray: (displayArray: Array<UserDisplay>) => void;
  setSessionCount: (count: number) => void;
  holdSessionCount: () => void;
  clearSession: () => void;
};

export const useStore = create<UserStore>()(
  subscribeWithSelector((set, get) => ({
    userColor: "",
    userDisplayArray: [],
    session: null,
    setUserColor: (color) => set({ userColor: color }),
    addDisplay: (video) =>
      set((state) => {
        const exists = state.userDisplayArray.some(
          (v) => v.displayArray[0].id === video.displayArray[0].id
        );
        if (!exists) {
          return { userDisplayArray: [...state.userDisplayArray, video] };
        }
        return state; // Return the current state if no update
      }),
    setUserDisplayArray: (displayArray) =>
      set({ userDisplayArray: displayArray }),
    setSessionCount: (count: number) => {
      set((state) => ({
        session: { ...state.session, count },
      }));
    },
    holdSessionCount: () => {
      pauseSession();
      setTimeout(() => {
        resumeSession();
      }, 2000);
    },
    clearSession: () => {
      if (interval !== null) {
        clearInterval(interval);
        interval = null;
      }
      set({ session: null });
    },
  }))
);

import { pauseSession, resumeSession } from "@/utils/session";
