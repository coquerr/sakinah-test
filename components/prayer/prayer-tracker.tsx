"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { usePrayerTimes } from "@/hooks/use-prayer-times"
import { useTrackerStore, getTodayKey } from "@/store/tracker-store"
import { cn } from "@/lib/utils/cn"
import { useTranslation } from "@/hooks/use-translation"
import { TranslationKey } from "@/lib/i18n"

export function PrayerTracker() {
  const { entries } = usePrayerTimes()
  const toggleStatus = useTrackerStore((state) => state.toggleStatus)
  const days = useTrackerStore((state) => state.days)
  const { t } = useTranslation()
  const todayKey = getTodayKey()
  const todayTracker = days[todayKey] ?? {}

  const trackedEntries = entries.filter((entry) => entry.name !== "sunrise")

  if (trackedEntries.length === 0) return null

  return (
    <div className="rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
      <span className="text-sm font-medium text-foreground">{t("prayer.tracker.title")}</span>
      <div className="mt-3 space-y-1.5">
        {trackedEntries.map((entry, index) => {
          const status = todayTracker[entry.name] ?? "pending"
          const label = t(`prayer.${entry.name}` as TranslationKey)

          return (
            <motion.div
              key={entry.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className={cn(
                "flex items-center justify-between rounded-xl px-3 py-2 transition-colors",
                status === "done" && "bg-primary/5",
                status === "missed" && "bg-red-500/5"
              )}
            >
              <span className="text-sm text-foreground">{label}</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => toggleStatus(todayKey, entry.name, "done")}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
                    status === "done"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/60 text-muted-foreground hover:bg-surface-hover"
                  )}
                  aria-label={t("prayer.tracker.markDone")}
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={() => toggleStatus(todayKey, entry.name, "missed")}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
                    status === "missed"
                      ? "border-red-400/60 bg-red-400/10 text-red-500"
                      : "border-border/60 text-muted-foreground hover:bg-surface-hover"
                  )}
                  aria-label={t("prayer.tracker.markMissed")}
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}