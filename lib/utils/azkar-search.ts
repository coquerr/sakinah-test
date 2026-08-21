import { ExternalResourceCategory } from "@/types/external-resource"

function normalize(value: string): string {
  return value.toLowerCase().trim()
}

export function matchesAzkarQuery(category: ExternalResourceCategory, rawQuery: string): boolean {
  const query = normalize(rawQuery)
  if (!query) return true

  return normalize(category.title).includes(query) || normalize(category.description).includes(query)
}