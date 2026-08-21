"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { SurahMeta } from "@/types/quran"
import { getSurahRuMeta } from "@/lib/constants/surah-ru-meta"
import { useTranslation } from "@/hooks/use-translation"
import { useQuranRecentStore } from "@/store/quran-recent-store"

export function SurahCard({ surah, index }: { surah: SurahMeta; index: number }) {
  const { t, language } = useTranslation()
  const ruMeta = language === "ru" ? getSurahRuMeta(surah.number) : null
  const setLastSurah = useQuranRecentStore((state) => state.setLastSurah)

  const displayName = ruMeta?.name ?? surah.englishName
  const displayTranslation = ruMeta?.translation ?? surah.englishNameTranslation
  const revelationLabel = surah.revelationType === "Meccan" ? t("quran.meccan") : t("quran.medinan")

  return (
    <motion.a
      href={`https://quran.com/${surah.number}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => setLastSurah(surah.number)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.6) }}
      whileTap={{ scale: 0.98 }}
      className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-surface p-4 shadow-card transition-colors hover:border-primary/30 hover:bg-surface-hover"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold tabular-nums text-primary">
        {surah.number}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{displayName}</p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {displayTranslation} · {surah.numberOfAyahs} {t("quran.ayahs")} · {revelationLabel}
        </p>
      </div>

      <div className="relative flex shrink-0 flex-col items-end gap-1">
        <span className="font-arabic text-xl leading-none text-primary">{surah.name}</span>
        <span className="pointer-events-none absolute top-full mt-1 flex items-center gap-1 whitespace-nowrap text-[11px] text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {t("quran.openOnPrefix")} quran.com
        </span>
      </div>

      <ArrowUpRight
        size={14}
        className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
      />
    </motion.a>
  )
}