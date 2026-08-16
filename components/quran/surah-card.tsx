"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { SurahMeta } from "@/types/quran"

export function SurahCard({ surah, index }: { surah: SurahMeta; index: number }) {
  return (
    <motion.a
      href={`https://quran.com/${surah.number}`}
      target="_blank"
      rel="noopener noreferrer"
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
        <p className="truncate text-sm font-medium text-foreground">{surah.englishName}</p>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {surah.englishNameTranslation} · {surah.numberOfAyahs} аятов
        </p>
      </div>

      <span className="shrink-0 font-arabic text-xl leading-none text-primary">
        {surah.name}
      </span>

      <ArrowUpRight
        size={14}
        className="shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
      />
    </motion.a>
  )
}