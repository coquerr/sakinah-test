"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sunrise, Sunset } from "lucide-react"
import { usePrayerTimes } from "@/hooks/use-prayer-times"
import { azkarCategories } from "@/lib/constants/azkar-categories"
import { useTranslation } from "@/hooks/use-translation"

export function AzkarNowRecommendation() {
  const { entries, now, status } = usePrayerTimes()
  const { t } = useTranslation()

  if (status === "loading" || entries.length === 0) return null

  const fajr = entries.find((entry) => entry.name === "fajr")?.time
  const dhuhr = entries.find((entry) => entry.name === "dhuhr")?.time
  const asr = entries.find((entry) => entry.name === "asr")?.time

  if (!fajr || !dhuhr || !asr) return null

  const nextFajr = new Date(fajr.getTime() + 24 * 60 * 60 * 1000)

  const isMorning = now >= fajr && now < dhuhr
  const isEvening = now >= asr && now < nextFajr

  if (!isMorning && !isEvening) return null

  const category = azkarCategories.find((item) => item.id === (isMorning ? "morning" : "evening"))
  if (!category) return null

  const Icon = isMorning ? Sunrise : Sunset

  return (
    <motion.a
      href={category.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileTap={{ scale: 0.98 }}
      className="group flex items-center gap-4 rounded-2xl border border-accent/25 bg-accent/5 p-4 shadow-card transition-colors hover:border-accent/40"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15">
        <Icon size={20} className="text-accent" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-medium uppercase tracking-[0.08em] text-accent">
          {isMorning ? t("azkar.now.morningTitle") : t("azkar.now.eveningTitle")}
        </p>
        <p className="mt-0.5 text-sm text-foreground">
          {isMorning ? t("azkar.now.morningText") : t("azkar.now.eveningText")}
        </p>
      </div>
      <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-accent transition-transform group-hover:translate-x-0.5">
        {t("azkar.now.openLabel")}
        <ArrowRight size={14} />
      </span>
    </motion.a>
  )
}