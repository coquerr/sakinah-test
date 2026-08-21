import { create } from "zustand"
import { persist } from "zustand/middleware"

interface QuranRecentState {
  lastSurahNumber: number | null
  setLastSurah: (number: number) => void
}

export const useQuranRecentStore = create<QuranRecentState>()(
  persist(
    (set) => ({
      lastSurahNumber: null,
      setLastSurah: (number) => set({ lastSurahNumber: number })
    }),
    {
      name: "quran-recent-storage",
      skipHydration: true
    }
  )
)