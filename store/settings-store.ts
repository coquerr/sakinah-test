"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { Language } from "@/types/settings"
import { idbStorage } from "@/lib/idb-storage"
import { RegionId } from "@/lib/constants/region-configs"

interface Coordinates {
  latitude: number
  longitude: number
  label: string
}

interface SettingsState {
  coordinates: Coordinates | null
  language: Language
  regionId: RegionId
  setCoordinates: (coordinates: Coordinates) => void
  setLanguage: (language: Language) => void
  setRegionId: (regionId: RegionId) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      coordinates: null,
      language: "ru",
      regionId: "dagestan", // Регион по умолчанию
      setCoordinates: (coordinates) => set({ coordinates }),
      setLanguage: (language) => set({ language }),
      setRegionId: (regionId) => set({ regionId })
    }),
    { 
      name: "sakinah-settings", 
      skipHydration: true,
      storage: createJSONStorage(() => idbStorage)
    }
  )
)