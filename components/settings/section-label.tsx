"use client"

import { useTranslation } from "@/hooks/use-translation"
import { TranslationKey } from "@/lib/i18n"

export function SectionLabel({ labelKey }: { labelKey: TranslationKey }) {
  const { t } = useTranslation()

  return (
    <p className="mb-2 px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {t(labelKey)}
    </p>
  )
}