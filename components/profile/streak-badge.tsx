"use client"

import { motion } from "framer-motion"
import { Flame } from "lucide-react"
import { useTrackerStore } from "@/store/tracker-store"
import { getCurrentStreak } from "@/lib/utils/tracker-stats"
import { useTranslation } from "@/hooks/use-translation"

export function StreakBadge() {
  const days = useTrackerStore((state) => state.days)
  const { t } = useTranslation()

  const streak = getCurrentStreak(days)
  if (streak === 0) return null

  const unit = streak === 1 ? t("stats.streakDayOne") : t("stats.streakDays")

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
      className="flex items-center gap-3 rounded-2xl border border-border/60 bg-surface p-4 shadow-card"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Flame size={18} className="text-primary" />
      </span>
      <div>
        <p className="text-sm font-medium text-foreground">
          {t("profile.streakLabel")}: <span className="tabular-nums">{streak}</span> {unit} 🔥
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">{t("profile.streakSubtitle")}</p>
      </div>
    </motion.div>
  )
}