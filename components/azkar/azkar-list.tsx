"use client"

import { azkarCategories } from "@/lib/constants/azkar-categories"
import { ExternalResourceCard } from "@/components/shared/external-resource-card"

export function AzkarList() {
  return (
    <>
      {azkarCategories.map((category, index) => (
        <ExternalResourceCard key={category.id} category={category} index={index} />
      ))}
    </>
  )
}