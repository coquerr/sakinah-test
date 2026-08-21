"use client"

import { motion } from "framer-motion"
import { History } from "lucide-react"
import { useQuranRecentStore } from "@/store/quran-recent-store"
import { getSurahRuMeta } from "@/lib/constants/surah-ru-meta"
import { useTranslation } from "@/hooks/use-translation"

export function RecentSurahCard() {
  const lastSurahNumber = useQuranRecentStore((state) => state.lastSurahNumber)
  const setLastSurah = useQuranRecentStore((state) => state.setLastSurah)
  const { t } = useTranslation()

  if (!lastSurahNumber) return null

  const ruMeta = getSurahRuMeta(lastSurahNumber)
  if (!ruMeta) return null

  return (
    <motion.a
      href={`https://quran.com/${lastSurahNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => setLastSurah(lastSurahNumber)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex items-center justify-between rounded-2xl border border-border/60 bg-surface p-4 shadow-card transition-colors hover:border-primary/30 hover:bg-surface-hover"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <History size={16} strokeWidth={1.75} />
        </span>
        <div>
          <p className="text-xs text-muted-foreground">{t("quran.recentTitle")}</p>
          <p className="mt-0.5 text-sm font-medium text-foreground">
            {ruMeta.name} · {t("quran.surahPrefix")} {lastSurahNumber}
          </p>
        </div>
      </div>

      <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
        {t("quran.openButton")}
      </span>
    </motion.a>
  )
}