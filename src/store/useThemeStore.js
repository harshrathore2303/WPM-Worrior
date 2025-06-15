import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("wpm-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("wpm-theme", theme);
    set({ theme });
  },
}));