import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { idbStorage } from "@/lib/idb-storage"

interface AzkarFavoritesState {
  ids: string[]
  toggleFavorite: (id: string) => void
}

export const useAzkarFavoritesStore = create<AzkarFavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggleFavorite: (id) => {
        const current = get().ids
        set({
          ids: current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        })
      }
    }),
    {
      name: "azkar-favorites-storage",
      skipHydration: true,
      storage: createJSONStorage(() => idbStorage)
    }
  )
)