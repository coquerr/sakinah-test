"use client"

import { motion } from "framer-motion"
import { usePrayerTimes } from "@/hooks/use-prayer-times"
import { formatTime, getCurrentPrayerIndex } from "@/lib/utils/prayer"
import { cn } from "@/lib/utils/cn"
import { useTranslation } from "@/hooks/use-translation"
import { localeMap, TranslationKey } from "@/lib/i18n"

export function PrayerList() {
  const { entries, now } = usePrayerTimes()
  const { t, language } = useTranslation()
  const locale = localeMap[language]

  if (entries.length === 0) return null

  const currentIndex = getCurrentPrayerIndex(entries, now)

  return (
    <div
      id="prayer-list"
      className="mt-6 scroll-mt-6 overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-card"
    >
      {entries.map((entry, index) => {
        const isCurrent = index === currentIndex
        const label = t(`prayer.${entry.name}` as TranslationKey)

        return (
          <motion.div
            key={entry.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            className={cn(
              "relative flex flex-col gap-0.5 border-b border-border-subtle px-5 py-3.5 last:border-b-0",
              isCurrent && "bg-primary/[0.03]"
            )}
          >
            {isCurrent && (
              <span className="absolute inset-y-0 left-0 w-[3px] rounded-r-full bg-primary shadow-[0_0_10px_2px_hsl(var(--primary)/0.5)]" />
            )}
            <span
              className={cn(
                "text-xs font-medium",
                isCurrent ? "text-primary" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                "text-lg font-semibold tabular-nums",
                isCurrent ? "text-primary" : "text-foreground"
              )}
            >
              {formatTime(entry.time, locale)}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}