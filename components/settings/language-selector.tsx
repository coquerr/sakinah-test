"use client"

import { languageOptions } from "@/lib/constants/languages"
import { useSettingsStore } from "@/store/settings-store"
import { cn } from "@/lib/utils/cn"
import { useTranslation } from "@/hooks/use-translation"

export function LanguageSelector() {
  const language = useSettingsStore((state) => state.language)
  const setLanguage = useSettingsStore((state) => state.setLanguage)
  const { t } = useTranslation()

  return (
    <div className="rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
      <span className="text-sm font-medium text-foreground">{t("settings.languageTitle")}</span>
      <div className="mt-3 flex gap-2">
        {languageOptions.map((option) => {
          const isActive = option.code === language

          return (
            <button
              key={option.code}
              onClick={() => setLanguage(option.code)}
              className={cn(
                "flex-1 rounded-xl border px-3 py-2 text-sm transition-colors",
                isActive
                  ? "border-primary bg-primary/10 font-medium text-primary"
                  : "border-border/60 text-muted-foreground hover:bg-surface-hover"
              )}
            >
              {option.nativeLabel}
            </button>
          )
        })}
      </div>
    </div>
  )
}