import { SurahMeta } from "@/types/quran"
import { getSurahRuMeta } from "@/lib/constants/surah-ru-meta"

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g, "")
    .replace(/[\s-]/g, "")
}

export function matchesSurahQuery(surah: SurahMeta, rawQuery: string): boolean {
  const query = normalize(rawQuery)
  if (!query) return true
  if (surah.number.toString() === query) return true

  const ruMeta = getSurahRuMeta(surah.number)
  const candidates = [
    surah.englishName,
    surah.englishNameTranslation,
    surah.name,
    ruMeta?.name,
    ruMeta?.translation
  ]

  return candidates.some((candidate) => candidate && normalize(candidate).includes(query))
}