"use client"

import { motion } from "framer-motion"
import { DayBreakdown } from "@/lib/utils/tracker-stats"
import { useTranslation } from "@/hooks/use-translation"

interface WeekChartProps {
  data: DayBreakdown[]
  locale: string
}

const Y_AXIS_STEPS = [5, 4, 3, 2, 1, 0]

export function WeekChart({ data, locale }: WeekChartProps) {
  const { t } = useTranslation()
  const maxValue = 5

  return (
    <div className="mt-6 rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
      <p className="text-xs text-muted-foreground">{t("stats.completedLabel")}</p>

      <div className="mt-4 flex gap-2">
        <div className="flex flex-col justify-between pb-5 text-[10px] tabular-nums text-muted-foreground">
          {Y_AXIS_STEPS.map((step) => (
            <span key={step} className="h-3 leading-3">
              {step}
            </span>
          ))}
        </div>

        <div className="flex flex-1 items-end justify-between gap-2">
          {data.map((day, index) => {
            const label = new Date(day.dateKey).toLocaleDateString(locale, { weekday: "short" })
            const doneHeight = (day.doneCount / maxValue) * 100
            const missedHeight = (day.missedCount / maxValue) * 100
            const notMarkedHeight = (day.notMarkedCount / maxValue) * 100

            return (
              <div key={day.dateKey} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-32 w-full flex-col-reverse overflow-hidden rounded-md bg-muted">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${doneHeight}%` }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                    className="w-full bg-primary"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${missedHeight}%` }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                    className="w-full bg-red-400/40"
                  />
                  <div
                    style={{ height: `${notMarkedHeight}%` }}
                    className="w-full bg-transparent"
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">{label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}