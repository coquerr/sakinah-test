"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
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
          className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface px-4 py-3 shadow-card"
        >
          <Star size={14} className="shrink-0 fill-accent text-accent" />
          <div className="min-w-0 flex-1">
            <p className="text-xs tabular-nums text-muted-foreground">
              {day.hijri.day} {day.hijri.monthName}
            </p>
            <p className="mt-0.5 truncate text-sm font-medium text-foreground">
              {day.significantLabel ? t(day.significantLabel) : ""}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}