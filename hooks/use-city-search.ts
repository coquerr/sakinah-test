"use client"

import { useEffect, useState } from "react"
import { searchCities, GeocodingResult } from "@/lib/api/geocoding"
import { useTranslation } from "@/hooks/use-translation"

export function useCitySearch(query: string) {
  const [results, setResults] = useState<GeocodingResult[]>([])
  const [loading, setLoading] = useState(false)
  const { language } = useTranslation()

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      return
    }

    setLoading(true)
    const timeout = setTimeout(async () => {
      const cities = await searchCities(query, language)
      setResults(cities)
      setLoading(false)
    }, 400)

    return () => clearTimeout(timeout)
  }, [query, language])

  return { results, loading }
}