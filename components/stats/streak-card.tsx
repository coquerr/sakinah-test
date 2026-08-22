"use client"

import { motion } from "framer-motion"
import { Flame } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { RangeStats } from "@/lib/utils/tracker-stats"

interface StreakCardProps {
  streak: number
  summary?: RangeStats
}

export function StreakCard({ streak, summary }: StreakCardProps) {
  const { t } = useTranslation()
  const unit = streak === 1 ? t("stats.streakDayOne") : t("stats.streakDays")

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-border/60 bg-surface p-8 text-center shadow-card"
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 bg-glow-primary" />

      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <Flame size={26} className="text-primary" />
      </div>
      <span className="relative mt-4 font-heading text-4xl font-semibold tabular-nums text-primary">
        {streak}
      </span>
      <span className="relative mt-1 text-sm text-muted-foreground">{unit}</span>
      <span className="relative mt-3 text-xs uppercase tracking-wide text-muted-foreground">
        {t("stats.streakTitle")}
      </span>

      {summary && (
        <div className="relative mt-6 grid w-full grid-cols-3 divide-x divide-border-subtle border-t border-border-subtle pt-5">
          <div>
            <span className="text-lg font-semibold tabular-nums text-foreground">
              {summary.doneCount}
            </span>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{t("stats.doneLabel")}</p>
          </div>
          <div>
            <span className="text-lg font-semibold tabular-nums text-foreground">
              {summary.donePercentage}%
            </span>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{t("stats.completionLabel")}</p>
          </div>
          <div>
            <span className="text-lg font-semibold tabular-nums text-foreground">
              {summary.totalPossible}
            </span>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{t("stats.totalLabel")}</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}