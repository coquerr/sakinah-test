"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { MonthDayCell } from "@/lib/utils/tracker-stats"
import { cn } from "@/lib/utils/cn"
import { useTranslation } from "@/hooks/use-translation"

interface MonthHeatmapCardProps {
  cells: MonthDayCell[]
  locale: string
}

function getIntensityClass(doneCount: number, isFuture: boolean): string {
  if (isFuture) return "bg-transparent"
  if (doneCount === 0) return "bg-muted"
  if (doneCount <= 2) return "bg-primary/25"
  if (doneCount <= 4) return "bg-primary/55"
  return "bg-primary shadow-[0_0_8px_1px_hsl(var(--primary)/0.5)]"
}

function getWeekdayLabels(locale: string): string[] {
  const base = new Date(2024, 0, 1)
  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(base)
    date.setDate(base.getDate() + index)
    return date.toLocaleDateString(locale, { weekday: "short" })
  })
}

export function MonthHeatmapCard({ cells, locale }: MonthHeatmapCardProps) {
  const { t } = useTranslation()
  const weekdayLabels = useMemo(() => getWeekdayLabels(locale), [locale])

  const firstDate = cells[0] ? new Date(cells[0].dateKey) : new Date()
  const monthLabel = firstDate.toLocaleDateString(locale, { month: "long", year: "numeric" })
  const firstDayOffset = (firstDate.getDay() + 6) % 7

  return (
    <div className="mt-6 rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
      <p className="text-sm font-medium capitalize text-foreground">{monthLabel}</p>
      <p className="mt-1 text-xs text-muted-foreground">{t("stats.heatmapHint")}</p>

      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {weekdayLabels.map((label) => (
          <span key={label} className="text-center text-[10px] text-muted-foreground">
            {label}
          </span>
        ))}

        {Array.from({ length: firstDayOffset }).map((_, index) => (
          <span key={`empty-${index}`} />
        ))}

        {cells.map((cell, index) => (
          <motion.div
            key={cell.dateKey}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: Math.min(index * 0.008, 0.4) }}
            className={cn(
              "flex aspect-square items-center justify-center rounded-md text-[10px] tabular-nums",
              getIntensityClass(cell.doneCount, cell.isFuture),
              cell.isToday && "ring-1 ring-primary",
              cell.doneCount >= 3 && !cell.isFuture
                ? "text-primary-foreground"
                : "text-muted-foreground"
            )}
          >
            {cell.dayOfMonth}
          </motion.div>
        ))}
      </div>
    </div>
  )
}