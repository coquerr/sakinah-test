"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { usePrayerTimes } from "@/hooks/use-prayer-times"
import { ProgressRing } from "@/components/prayer/progress-ring"
import { formatCountdown, formatTime } from "@/lib/utils/prayer"
import { useTranslation } from "@/hooks/use-translation"
import { localeMap, TranslationKey } from "@/lib/i18n"

export function PrayerTimesCard() {
  const { nextPrayer, progress, now, status, locationLabel } = usePrayerTimes()
  const { t, language } = useTranslation()
  const locale = localeMap[language]

  if (status === "loading" || !nextPrayer) {
    return (
      <div className="flex h-[320px] items-center justify-center rounded-2xl border border-border/60 bg-surface shadow-card">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  const nextPrayerLabel = t(`prayer.${nextPrayer.name}` as TranslationKey)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-border/60 bg-surface p-6 shadow-card sm:p-8"
    >
      <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 bg-glow-primary" />

      <div className="relative flex items-center gap-1.5 text-xs text-muted-foreground">
        <MapPin size={12} />
        <span>{locationLabel}</span>
      </div>

      <div className="relative mt-5 flex items-center justify-center">
        <ProgressRing progress={progress} />
        <div className="absolute flex flex-col items-center px-4 text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {t("prayer.next")}
          </span>
          <span className="mt-1.5 font-heading text-3xl font-semibold tracking-tight text-primary">
          {nextPrayerLabel}
            </span>
          <span className="mt-3 text-2xl font-semibold tabular-nums text-foreground">
            {formatCountdown(nextPrayer.time, now)}
          </span>
          <span className="mt-1.5 text-xs text-muted-foreground">
            {t("prayer.at")}{" "}
            <span className="tabular-nums">{formatTime(nextPrayer.time, locale)}</span>
          </span>
        </div>
      </div>
    </motion.div>
  )
}