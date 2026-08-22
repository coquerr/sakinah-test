"use client"

import { motion } from "framer-motion"
import { Award, TrendingUp } from "lucide-react"
import { BestDayResult } from "@/lib/utils/tracker-stats"
import { useTranslation } from "@/hooks/use-translation"

interface BestDayCardsProps {
  bestDay: BestDayResult | null
  averagePerDay: number
  locale: string
}

export function BestDayCards({ bestDay, averagePerDay, locale }: BestDayCardsProps) {
  const { t } = useTranslation()

  if (!bestDay) return null

  const weekdayLabel = new Date(bestDay.dateKey).toLocaleDateString(locale, { weekday: "long" })
  const averageLabel = averagePerDay.toLocaleString(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mt-6 grid grid-cols-2 gap-3"
    >
      <div className="rounded-2xl border border-border/60 bg-surface p-4 shadow-card">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
          <Award size={16} className="text-primary" />
        </span>
        <p className="mt-3 text-xs text-muted-foreground">{t("stats.bestDayTitle")}</p>
        <p className="mt-0.5 text-sm font-semibold capitalize text-foreground">{weekdayLabel}</p>
        <p className="mt-0.5 text-xs tabular-nums text-muted-foreground">
          {bestDay.doneCount} / {bestDay.total} {t("stats.prayersUnit")}
        </p>
      </div>

      <div className="rounded-2xl border border-border/60 bg-surface p-4 shadow-card">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
          <TrendingUp size={16} className="text-primary" />
        </span>
        <p className="mt-3 text-xs text-muted-foreground">{t("stats.averageTitle")}</p>
        <p className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">
          {averageLabel} {t("stats.prayersUnit")}
        </p>
      </div>
    </motion.div>
  )
}