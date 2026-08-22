"use client"

import { useMemo } from "react"
import { motion, PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, RotateCcw  } from "lucide-react"
import { CalendarDay } from "@/types/calendar"
import { cn } from "@/lib/utils/cn"
import { useTranslation } from "@/hooks/use-translation"
import { localeMap } from "@/lib/i18n"

interface MonthGridProps {
  days: CalendarDay[]
  monthLabel: string
  isCurrentMonthView: boolean
  selectedDateKey: string | null
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  onSelectDay: (day: CalendarDay) => void
}

function getWeekdayLabels(locale: string): string[] {
  const base = new Date(2024, 0, 1)
  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(base)
    date.setDate(base.getDate() + index)
    return date.toLocaleDateString(locale, { weekday: "short" })
  })
}

export function MonthGrid({
  days,
  monthLabel,
  isCurrentMonthView,
  selectedDateKey,
  onPrev,
  onNext,
  onToday,
  onSelectDay
}: MonthGridProps) {
  const { t, language } = useTranslation()
  const locale = localeMap[language]
  const weekdayLabels = useMemo(() => getWeekdayLabels(locale), [locale])

  const firstDayOffset = days[0] ? (days[0].gregorian.getDay() + 6) % 7 : 0

  const handlePanEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) {
      onNext()
    } else if (info.offset.x > 60) {
      onPrev()
    }
  }

  return (
    <div className="mt-6 rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-surface-hover"
          aria-label={t("calendar.prevMonth")}
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex flex-col items-center">
          <span className="font-heading text-sm font-medium tracking-tight text-foreground">
            {monthLabel}
          </span>
          {isCurrentMonthView ? (
            <span className="mt-0.5 text-[10px] uppercase tracking-wide text-primary">
              {t("calendar.currentMonthLabel")}
            </span>
          ) : (
            <button
              onClick={onToday}
              className="mt-1 flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary transition-colors hover:bg-primary/15"
            >
              <RotateCcw size={11} />
              {t("calendar.jumpToTodayLabel")}
            </button>
          )}
        </div>

        <button
          onClick={onNext}
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-surface-hover"
          aria-label={t("calendar.nextMonth")}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {weekdayLabels.map((label) => (
          <span
            key={label}
            className="text-center text-[10px] uppercase tracking-wide text-muted-foreground"
          >
            {label}
          </span>
        ))}
      </div>

      <motion.div onPanEnd={handlePanEnd} className="mt-1.5 grid grid-cols-7 gap-1.5">
        {Array.from({ length: firstDayOffset }).map((_, index) => (
          <span key={`empty-${index}`} />
        ))}

        {days.map((day, index) => {
          const isFriday = day.gregorian.getDay() === 5
          const isSelected = selectedDateKey === day.gregorian.toDateString()

          return (
            <motion.button
              key={day.gregorian.toISOString()}
              onClick={() => onSelectDay(day)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: Math.min(index * 0.008, 0.3) }}
              className={cn(
                "relative flex aspect-square flex-col items-center justify-center rounded-lg text-xs tabular-nums transition-colors",
                day.isToday && "bg-primary font-medium text-primary-foreground",
                !day.isToday && day.isSignificant && "bg-accent/15 text-accent-foreground",
                !day.isToday && !day.isSignificant && "text-foreground hover:bg-surface-hover",
                isSelected && !day.isToday && "ring-1 ring-primary/60"
              )}
              title={day.significantLabel ? t(day.significantLabel) : undefined}
            >
              {day.isSignificant && !day.isToday && (
                <Star size={8} className="absolute top-1 fill-accent text-accent" />
              )}
              <span>{day.hijri.day}</span>
              {isFriday && !day.isToday && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary/70" />
              )}
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}