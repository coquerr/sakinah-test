"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Palette } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils/cn"

export function AppearanceSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    setMounted(true)
  }, [])

  const options = [
    { value: "system", label: t("profile.appearanceSystem") },
    { value: "dark", label: t("profile.appearanceDark") }
  ]

  return (
    <div className="rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
      <div className="flex items-center gap-2">
        <Palette size={16} className="text-primary" />
        <span className="text-sm font-medium text-foreground">{t("profile.appearanceTitle")}</span>
      </div>

      <div className="mt-3 flex gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={cn(
              "flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
              mounted && theme === option.value
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border/60 text-muted-foreground hover:bg-surface-hover"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}