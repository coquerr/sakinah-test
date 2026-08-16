"use client"

import { motion } from "framer-motion"
import { HijriDate } from "@/types/calendar"
import { useTranslation } from "@/hooks/use-translation"

export function HijriHeader({ hijri }: { hijri: HijriDate }) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-border/60 bg-surface p-6 text-center shadow-card"
    >
      <div className="pointer-events-none absolute -top-20 left-1/2 h-56 w-56 -translate-x-1/2 bg-glow-primary" />

      <span className="relative text-xs uppercase tracking-wide text-muted-foreground">
        {t("calendar.today")}
      </span>
      <span className="relative mt-2 font-heading text-3xl font-semibold tracking-tight text-primary">
        <span className="tabular-nums">{hijri.day}</span> {hijri.monthName}
      </span>
      <span className="relative mt-1 text-sm text-muted-foreground">
        <span className="tabular-nums">{hijri.year}</span> {t("calendar.hijriYearSuffix")}
      </span>
    </motion.div>
  )
}