"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Circle } from "lucide-react"
import { useTrackerStore, getTodayKey } from "@/store/tracker-store"
import { trackedPrayerNames } from "@/lib/constants/tracked-prayers"
import { TrackerStatus } from "@/types/tracker"
import { PrayerName } from "@/types/prayer"
import { cn } from "@/lib/utils/cn"
import { useTranslation } from "@/hooks/use-translation"
import { TranslationKey } from "@/lib/i18n"

const STATUS_OPTIONS: { value: TrackerStatus; icon: typeof Check; labelKey: TranslationKey }[] = [
  { value: "done", icon: Check, labelKey: "profile.trackerStatus.done" },
  { value: "missed", icon: X, labelKey: "profile.trackerStatus.missed" },
  { value: "pending", icon: Circle, labelKey: "profile.trackerStatus.pending" }
]

export function PrayerTracker() {
  const setStatus = useTrackerStore((state) => state.setStatus)
  const days = useTrackerStore((state) => state.days)
  const { t } = useTranslation()
  const todayKey = getTodayKey()
  const todayTracker = days[todayKey] ?? {}
  const [openPrayer, setOpenPrayer] = useState<PrayerName | null>(null)

  return (
    <div className="rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
      <span className="text-sm font-medium text-foreground">{t("prayer.tracker.title")}</span>
      <div className="mt-3 space-y-1.5">
        {trackedPrayerNames.map((name, index) => {
          const status: TrackerStatus = todayTracker[name] ?? "pending"
          const label = t(`prayer.${name}` as TranslationKey)
          const isOpen = openPrayer === name
          const StatusIcon = status === "done" ? Check : status === "missed" ? X : Circle

          return (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className={cn(
                "relative flex items-center justify-between rounded-xl px-3 py-2 transition-colors",
                status === "done" && "bg-primary/[0.06]",
                status === "missed" && "bg-red-400/[0.05]"
              )}
            >
              <span className="text-sm text-foreground">{label}</span>

              <button
                onClick={() => setOpenPrayer(isOpen ? null : name)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
                  status === "done" && "border-primary/40 bg-primary/10 text-primary",
                  status === "missed" && "border-red-400/30 bg-red-400/10 text-red-400",
                  status === "pending" &&
                    "border-border/60 text-muted-foreground hover:bg-surface-hover"
                )}
              >
                <StatusIcon size={14} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpenPrayer(null)} />
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full z-50 mt-1 w-40 overflow-hidden rounded-xl border border-border/60 bg-surface shadow-card"
                    >
                      {STATUS_OPTIONS.map((option) => {
                        const OptionIcon = option.icon

                        return (
                          <button
                            key={option.value}
                            onClick={() => {
                              setStatus(todayKey, name, option.value)
                              setOpenPrayer(null)
                            }}
                            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-surface-hover"
                          >
                            <OptionIcon size={14} className="text-muted-foreground" />
                            {t(option.labelKey)}
                          </button>
                        )
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}