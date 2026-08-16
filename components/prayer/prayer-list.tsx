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
    <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-card">
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
              "relative flex items-center justify-between border-b border-border-subtle px-5 py-3 last:border-b-0",
              isCurrent && "bg-primary/[0.06]"
            )}
          >
            {isCurrent && (
              <span className="absolute inset-y-0 left-0 w-[3px] rounded-r-full bg-primary" />
            )}
            <span
              className={cn(
                "text-sm",
                isCurrent ? "font-semibold text-primary" : "text-foreground"
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                "text-sm tabular-nums",
                isCurrent ? "font-medium text-primary" : "text-muted-foreground"
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