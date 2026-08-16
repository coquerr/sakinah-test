"use client"

import { motion } from "framer-motion"
import { DayBreakdown } from "@/lib/utils/tracker-stats"

interface WeekChartProps {
  data: DayBreakdown[]
  locale: string
}

export function WeekChart({ data, locale }: WeekChartProps) {
  return (
    <div className="mt-6 rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
      <div className="flex items-end justify-between gap-2">
        {data.map((day, index) => {
          const ratio = day.total > 0 ? day.doneCount / day.total : 0
          const label = new Date(day.dateKey).toLocaleDateString(locale, { weekday: "short" })

          return (
            <div key={day.dateKey} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-16 w-full items-end overflow-hidden rounded-md bg-muted">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(ratio * 100, day.total > 0 ? 6 : 0)}%` }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                  className="w-full rounded-t-sm bg-primary"
                />
              </div>
              <span className="text-[10px] text-muted-foreground">{label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}