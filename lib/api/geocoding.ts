export interface GeocodingResult {
  name: string
  country: string
  latitude: number
  longitude: number
}

export async function searchCities(query: string, language: string = "ru"): Promise<GeocodingResult[]> {
  if (query.trim().length < 2) return []

  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=${language}`
  )

  if (!response.ok) return []

  const data = await response.json()

  if (!data.results) return []

  return data.results.map((item: any) => ({
    name: item.name,
    country: item.country ?? "",
    latitude: item.latitude,
    longitude: item.longitude
  }))
}