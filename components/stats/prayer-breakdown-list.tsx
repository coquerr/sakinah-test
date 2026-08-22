"use client"

import { motion } from "framer-motion"
import { PrayerBreakdown } from "@/lib/utils/tracker-stats"
import { useTranslation } from "@/hooks/use-translation"
import { TranslationKey } from "@/lib/i18n"

interface PrayerBreakdownListProps {
  data: PrayerBreakdown[]
}

export function PrayerBreakdownList({ data }: PrayerBreakdownListProps) {
  const { t } = useTranslation()

  return (
    <div className="mt-6 rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
      <p className="text-xs text-muted-foreground">{t("stats.byPrayerTitle")}</p>

      <div className="mt-4 space-y-3">
        {data.map((prayer, index) => {
          const label = t(`prayer.${prayer.name}` as TranslationKey)

          return (
            <div key={prayer.name} className="flex items-center gap-3">
              <span className="w-14 shrink-0 text-xs text-foreground">{label}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${prayer.donePercentage}%` }}
                  transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
              <span className="w-9 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                {prayer.donePercentage}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}