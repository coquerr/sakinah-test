"use client"

import { useId, useMemo } from "react"
import { motion } from "framer-motion"
import { toHijri } from "@/lib/utils/hijri"
import { useTranslation } from "@/hooks/use-translation"
import { localeMap } from "@/lib/i18n"
import { hijriMonthsByLanguage } from "@/lib/i18n/hijri-months"

export function HijriDateCard() {
  const { t, language } = useTranslation()
  const now = useMemo(() => new Date(), [])
  const hijri = useMemo(() => toHijri(now), [now])
  const locale = localeMap[language]
  const monthName = hijriMonthsByLanguage[language][hijri.month - 1]
  const maskId = useId()

  const gregorianLabel = now.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric"
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
      className="mb-5 flex items-center justify-between rounded-2xl border border-border/60 bg-surface px-5 py-4 shadow-card"
    >
      <div>
        <p className="text-sm text-foreground">{gregorianLabel}</p>
        <p className="mt-1 font-heading text-base font-semibold text-primary">
          <span className="tabular-nums">{hijri.day}</span> {monthName}{" "}
          <span className="tabular-nums">{hijri.year}</span> {t("calendar.hijriYearSuffix")}
        </p>
      </div>

      <svg width="30" height="30" viewBox="0 0 28 28" className="shrink-0 text-accent/70">
        <mask id={maskId}>
          <rect width="28" height="28" fill="white" />
          <circle cx="17" cy="10" r="9" fill="black" />
        </mask>
        <circle cx="14" cy="14" r="11" fill="currentColor" mask={`url(#${maskId})`} />
      </svg>
    </motion.div>
  )
}