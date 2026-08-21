"use client"

import { ThemeProvider } from "next-themes"
import { ReactNode, useEffect } from "react"
import { useSettingsStore } from "@/store/settings-store"
import { useTrackerStore } from "@/store/tracker-store"
import { useOnboardingStore } from "@/store/onboarding-store"
import { useQuranRecentStore } from "@/store/quran-recent-store"
import { useAzkarFavoritesStore } from "@/store/azkar-favorites-store"
import { getDirection } from "@/lib/i18n"

function DirectionSync() {
  const language = useSettingsStore((state) => state.language)

  useEffect(() => {
    document.documentElement.dir = getDirection(language)
    document.documentElement.lang = language
  }, [language])

  return null
}

function StoreHydration() {
  useEffect(() => {
    useSettingsStore.persist.rehydrate()
    useTrackerStore.persist.rehydrate()
    useOnboardingStore.persist.rehydrate()
    useQuranRecentStore.persist.rehydrate()
    useAzkarFavoritesStore.persist.rehydrate()
  }, [])

  return null
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <StoreHydration />
      <DirectionSync />
      {children}
    </ThemeProvider>
  )
}