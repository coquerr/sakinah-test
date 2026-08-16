"use client"

import { useCallback } from "react"
import { useSettingsStore } from "@/store/settings-store"
import { dictionaries, getDirection, resolveTranslation, TranslationKey } from "@/lib/i18n"

export function useTranslation() {
  const language = useSettingsStore((state) => state.language)
  const dictionary = dictionaries[language]
  const direction = getDirection(language)

  const t = useCallback(
    (key: TranslationKey) => resolveTranslation(dictionary, key),
    [dictionary]
  )

  return { t, language, direction }
}