"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { idbStorage } from "@/lib/idb-storage"

interface OnboardingState {
  hasSeenOnboarding: boolean
  completeOnboarding: () => void
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasSeenOnboarding: false,
      completeOnboarding: () => set({ hasSeenOnboarding: true })
    }),
    { name: "sakinah-onboarding", skipHydration: true,
      storage: createJSONStorage(() => idbStorage)
     }
  )
)