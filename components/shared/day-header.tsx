"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { getGreeting } from "@/lib/utils/greeting"
import { toHijri } from "@/lib/utils/hijri"
import { useTranslation } from "@/hooks/use-translation"
import { localeMap } from "@/lib/i18n"
import { hijriMonthsByLanguage } from "@/lib/i18n/hijri-months"

export function DayHeader() {
  const { t, language } = useTranslation()
  const now = useMemo(() => new Date(), [])
  const hijri = useMemo(() => toHijri(now), [now])
  const locale = localeMap[language]
  const monthName = hijriMonthsByLanguage[language][hijri.month - 1]

  const gregorianLabel = now.toLocaleDateString(locale, {
    day: "numeric",
    month: "long"
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-5"
    >
      <p className="font-heading text-2xl font-semibold tracking-tight text-foreground">
        {t(getGreeting(now))}
      </p>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {gregorianLabel} · <span className="tabular-nums">{hijri.day}</span> {monthName}{" "}
        <span className="tabular-nums">{hijri.year}</span> {t("calendar.hijriYearSuffix")}
      </p>
    </motion.div>
  )
}