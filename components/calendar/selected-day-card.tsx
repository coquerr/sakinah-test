"use client"

import { motion } from "framer-motion"
import { CalendarDay } from "@/types/calendar"
import { useTranslation } from "@/hooks/use-translation"
import { localeMap } from "@/lib/i18n"

export function SelectedDayCard({ day }: { day: CalendarDay | null }) {
  const { t, language } = useTranslation()
  const locale = localeMap[language]

  if (!day) return null

  const gregorianLabel = day.gregorian.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric"
  })

  const hijriLabel = `${day.hijri.day} ${day.hijri.monthName}`

  return (
    <motion.div
      key={day.gregorian.toISOString()}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-4 rounded-2xl border border-border/60 bg-surface px-5 py-4 shadow-card"
    >
      <p className="font-heading text-base font-semibold text-foreground">
        {day.isToday ? `${t("calendar.today")}, ${hijriLabel}` : hijriLabel}
      </p>
      <p className="mt-0.5 text-sm text-muted-foreground">{gregorianLabel}</p>
      {day.isSignificant && day.significantLabel && (
        <p className="mt-2 text-sm text-accent">{t(day.significantLabel)}</p>
      )}
    </motion.div>
  )
}