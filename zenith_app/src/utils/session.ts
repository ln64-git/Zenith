import { useStore } from "@/lib/user-store";

let interval: NodeJS.Timeout | null = null;

export const pauseSession = () => {
  if (interval !== null) {
    clearInterval(interval);
    interval = null;
  }
};

export const resumeSession = () => {
  if (interval !== null) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const currentStore = useStore.getState();
    const currentCount = currentStore.session ? currentStore.session.count : 0;
    currentStore.setSessionCount(currentCount + 1);
  }, 1000);
};

export const startSession = () => {
  const store = useStore.getState();

  if (interval !== null) {
    clearInterval(interval); // Clear any existing interval
  }

  store.setSessionCount(0); // Reset session count

  interval = setInterval(() => {
    const currentStore = useStore.getState(); // Fetch the latest state
    const currentCount = currentStore.session ? currentStore.session.count : 0;
    currentStore.setSessionCount(currentCount + 1);
  }, 1000); // Count every second
};

export const stopSession = () => {
  if (interval !== null) {
    clearInterval(interval);
    interval = null;
  }
  const store = useStore.getState();
  store.clearSession();
};
