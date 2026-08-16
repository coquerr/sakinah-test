"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { CalendarDay } from "@/types/calendar"
import { cn } from "@/lib/utils/cn"
import { useTranslation } from "@/hooks/use-translation"

interface MonthGridProps {
  days: CalendarDay[]
  monthLabel: string
  onPrev: () => void
  onNext: () => void
}

export function MonthGrid({ days, monthLabel, onPrev, onNext }: MonthGridProps) {
  const { t } = useTranslation()

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
        <span className="font-heading text-sm font-medium tracking-tight text-foreground">
          {monthLabel}
        </span>
        <button
          onClick={onNext}
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-surface-hover"
          aria-label={t("calendar.nextMonth")}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1.5">
        {days.map((day, index) => (
          <motion.div
            key={day.gregorian.toISOString()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.008 }}
            className={cn(
              "relative flex aspect-square flex-col items-center justify-center rounded-lg text-xs tabular-nums",
              day.isToday && "bg-primary text-primary-foreground font-medium shadow-[0_0_0_3px_hsl(var(--primary)/0.15)]",
              !day.isToday && day.isSignificant && "bg-accent/15 text-accent-foreground",
              !day.isToday && !day.isSignificant && "text-foreground"
            )}
            title={day.significantLabel ? t(day.significantLabel) : undefined}
          >
            {day.isSignificant && !day.isToday && (
              <Star size={8} className="absolute top-1 fill-accent text-accent" />
            )}
            <span>{day.hijri.day}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}