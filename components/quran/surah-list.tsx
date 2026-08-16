"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { useSurahList } from "@/hooks/use-surah-list"
import { SurahCard } from "@/components/quran/surah-card"

export function SurahList() {
  const { surahs, loading } = useSurahList()
  const [query, setQuery] = useState("")

  const filtered = surahs.filter((surah) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      surah.englishName.toLowerCase().includes(q) ||
      surah.englishNameTranslation.toLowerCase().includes(q) ||
      surah.number.toString() === q
    )
  })

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div>
      <div className="relative mb-4">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Поиск суры по названию или номеру"
          className="w-full rounded-xl border border-border/60 bg-surface py-2.5 pl-9 pr-9 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Очистить поиск"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Ничего не найдено</p>
      ) : (
        <div className="space-y-2">
          {filtered.map((surah, index) => (
            <SurahCard key={surah.number} surah={surah} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}