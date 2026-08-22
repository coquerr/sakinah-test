"use client"

import { motion } from "framer-motion"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils/cn"
import { RangeStats } from "@/lib/utils/tracker-stats"

interface RangeSummaryProps {
  range: "week" | "month"
  onRangeChange: (range: "week" | "month") => void
  stats: RangeStats
}

export function RangeSummary({ range, onRangeChange, stats }: RangeSummaryProps) {
  const { t } = useTranslation()

  return (
    <div className="mt-6 rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
      <div className="relative flex gap-1 rounded-xl bg-muted p-1">
        {(["week", "month"] as const).map((option) => {
          const isActive = range === option

          return (
            <button
              key={option}
              onClick={() => onRangeChange(option)}
              className="relative flex-1 rounded-lg px-3 py-2 text-sm transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="range-indicator"
                  className="absolute inset-0 rounded-lg bg-surface shadow-card"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span
                className={cn(
                  "relative",
                  isActive ? "font-medium text-primary" : "text-muted-foreground"
                )}
              >
                {option === "week" ? t("stats.rangeWeek") : t("stats.rangeMonth")}
              </span>
            </button>
          )
        })}
      </div>

      <motion.div
        key={range}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mt-5 flex items-center justify-between"
      >
        <div>
          <span className="font-heading text-3xl font-semibold tabular-nums text-foreground">
            {stats.donePercentage}%
          </span>
          <p className="mt-1 text-xs text-muted-foreground">{t("stats.percentLabel")}</p>
        </div>
        <div className="space-y-1 text-right">
          <p className="text-sm tabular-nums text-foreground">
            {stats.doneCount}{" "}
            <span className="text-xs text-muted-foreground">{t("stats.doneLabel")}</span>
          </p>
          <p className="text-sm tabular-nums text-foreground">
            {stats.missedCount}{" "}
            <span className="text-xs text-muted-foreground">{t("stats.missedLabel")}</span>
          </p>
          <p className="text-sm tabular-nums text-muted-foreground">
            {stats.notMarkedCount}{" "}
            <span className="text-xs text-muted-foreground">{t("stats.notMarkedLabel")}</span>
          </p>
        </div>
      </motion.div>
    </div>
  )
}