import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeOption = 'dark' | 'light' | 'cosmic';

interface SettingsState {
  theme: ThemeOption;
  fontScale: number;
  notifications: boolean;
  setTheme: (theme: ThemeOption) => void;
  setFontScale: (scale: number) => void;
  toggleNotifications: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'dark',
      fontScale: 1,
      notifications: true,
      
      setTheme: (theme) => set({ theme }),
      setFontScale: (fontScale) => set({ fontScale }),
      toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
    }),
    {
      name: 'illuminati-settings',
    }
  )
);