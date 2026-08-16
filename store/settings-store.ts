"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Language } from "@/types/settings"

interface Coordinates {
  latitude: number
  longitude: number
  label: string
}

interface SettingsState {
  coordinates: Coordinates | null
  language: Language
  setCoordinates: (coordinates: Coordinates) => void
  setLanguage: (language: Language) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      coordinates: null,
      language: "ru",
      setCoordinates: (coordinates) => set({ coordinates }),
      setLanguage: (language) => set({ language })
    }),
    { name: "sakinah-settings", skipHydration: true }
  )
)