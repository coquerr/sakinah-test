"use client"

import { motion } from "framer-motion"
import { useTrackerStore, getTodayKey } from "@/store/tracker-store"
import { trackedPrayerNames } from "@/lib/constants/tracked-prayers"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils/cn"

export function ProfileSummaryCard() {
  const days = useTrackerStore((state) => state.days)
  const { t } = useTranslation()

  const todayKey = getTodayKey()
  const todayTracker = days[todayKey] ?? {}
  const doneCount = trackedPrayerNames.filter((name) => todayTracker[name] === "done").length
  const total = trackedPrayerNames.length
  const percent = Math.round((doneCount / total) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-2xl border border-border/60 bg-surface p-5 shadow-card"
    >
      <p className="font-heading text-lg font-semibold text-foreground">
        {t("profile.greeting")} 👋
      </p>
      <p className="mt-3 text-xs uppercase tracking-[0.1em] text-muted-foreground">
        {t("profile.todayLabel")}
      </p>
      <p className="mt-1 text-sm text-foreground">
        <span className="font-semibold tabular-nums">{doneCount}</span> / {total}{" "}
        {t("profile.prayersLabel")}
      </p>

      <div className="mt-3 flex items-center gap-1.5">
        {trackedPrayerNames.map((name, index) => (
          <span
            key={name}
            className={cn(
              "h-2.5 w-2.5 rounded-full",
              index < doneCount ? "bg-primary" : "bg-border-subtle"
            )}
          />
        ))}
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        {percent}% {t("profile.dailyGoalSuffix")}
      </p>
    </motion.div>
  )
}