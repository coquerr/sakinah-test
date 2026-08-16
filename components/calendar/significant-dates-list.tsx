"use client"

import { motion } from "framer-motion"
import { CalendarDay } from "@/types/calendar"
import { useTranslation } from "@/hooks/use-translation"

export function SignificantDatesList({ days }: { days: CalendarDay[] }) {
  const { t } = useTranslation()
  const significantDays = days.filter((day) => day.isSignificant)

  if (significantDays.length === 0) return null

  return (
    <div className="mt-6 space-y-2">
      <span className="text-xs uppercase tracking-wide text-muted-foreground">
        {t("calendar.significantDatesTitle")}
      </span>
      {significantDays.map((day, index) => (
        <motion.div
          key={day.gregorian.toISOString()}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="flex items-center justify-between rounded-xl border border-border/60 bg-surface px-4 py-3 shadow-card"
        >
          <span className="text-sm text-foreground">
            {day.significantLabel ? t(day.significantLabel) : ""}
          </span>
          <span className="text-xs tabular-nums text-muted-foreground">
            {day.hijri.day} {day.hijri.monthName}
          </span>
        </motion.div>
      ))}
    </div>
  )
}