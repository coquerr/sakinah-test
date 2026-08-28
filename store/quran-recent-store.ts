import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { idbStorage } from "@/lib/idb-storage"

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
      skipHydration: true,
      storage: createJSONStorage(() => idbStorage)
    }
  )
)