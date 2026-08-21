"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { useSurahList } from "@/hooks/use-surah-list"
import { SurahCard } from "@/components/quran/surah-card"
import { matchesSurahQuery } from "@/lib/utils/surah-search"
import { getSurahRuMeta } from "@/lib/constants/surah-ru-meta"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils/cn"

const POPULAR_SURAH_NUMBERS = [1, 36, 67, 18]

type RevelationFilter = "all" | "Meccan" | "Medinan"

const NUMBER_RANGES: { label: string; min: number; max: number }[] = [
  { label: "1–30", min: 1, max: 30 },
  { label: "31–60", min: 31, max: 60 },
  { label: "61–90", min: 61, max: 90 },
  { label: "91–114", min: 91, max: 114 }
]

export function SurahList() {
  const { surahs, loading } = useSurahList()
  const [query, setQuery] = useState("")
  const [revelationFilter, setRevelationFilter] = useState<RevelationFilter>("all")
  const [rangeFilter, setRangeFilter] = useState<{ min: number; max: number } | null>(null)
  const { t } = useTranslation()

  const filtered = surahs.filter((surah) => {
    if (!matchesSurahQuery(surah, query)) return false
    if (revelationFilter !== "all" && surah.revelationType !== revelationFilter) return false
    if (rangeFilter && (surah.number < rangeFilter.min || surah.number > rangeFilter.max)) return false
    return true
  })

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  const revelationChips: { value: RevelationFilter; label: string }[] = [
    { value: "all", label: t("quran.all") },
    { value: "Meccan", label: t("quran.meccan") },
    { value: "Medinan", label: t("quran.medinan") }
  ]

  return (
    <div>
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("quran.searchPlaceholder")}
          className="w-full rounded-2xl border border-border/60 bg-surface py-3.5 pl-11 pr-11 text-base text-foreground shadow-card outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label={t("quran.clearSearch")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">{t("quran.popularLabel")}</span>
        {POPULAR_SURAH_NUMBERS.map((number) => {
          const ruMeta = getSurahRuMeta(number)
          if (!ruMeta) return null

          return (
            <button
              key={number}
              onClick={() => setQuery(ruMeta.name)}
              className="rounded-full border border-border/60 bg-surface px-3 py-1.5 text-xs text-foreground transition-colors hover:border-primary/30 hover:bg-surface-hover"
            >
              {ruMeta.name}
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {revelationChips.map((chip) => (
          <button
            key={chip.value}
            onClick={() => setRevelationFilter(chip.value)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
              revelationFilter === chip.value
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border/60 bg-surface text-muted-foreground hover:bg-surface-hover"
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
        {NUMBER_RANGES.map((range) => {
          const isActive =
            rangeFilter?.min === range.min && rangeFilter?.max === range.max

          return (
            <button
              key={range.label}
              onClick={() => setRangeFilter(isActive ? null : { min: range.min, max: range.max })}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium tabular-nums transition-colors",
                isActive
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border/60 bg-surface text-muted-foreground hover:bg-surface-hover"
              )}
            >
              {range.label}
            </button>
          )
        })}
      </div>

      <div className="mt-4">
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">{t("quran.noResults")}</p>
        ) : (
          <div className="space-y-2">
            {filtered.map((surah, index) => (
              <SurahCard key={surah.number} surah={surah} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}