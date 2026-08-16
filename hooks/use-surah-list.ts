"use client"

import { useEffect, useState } from "react"
import { SurahMeta } from "@/types/quran"
import { fetchSurahList } from "@/lib/api/quran"

export function useSurahList() {
  const [surahs, setSurahs] = useState<SurahMeta[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetchSurahList().then((data) => {
      if (!cancelled) {
        setSurahs(data)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  return { surahs, loading }
}