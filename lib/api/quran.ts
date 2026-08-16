import { SurahMeta } from "@/types/quran"

export async function fetchSurahList(): Promise<SurahMeta[]> {
  const response = await fetch("https://api.alquran.cloud/v1/surah")

  if (!response.ok) return []

  const data = await response.json()

  if (!data.data) return []

  return data.data
}