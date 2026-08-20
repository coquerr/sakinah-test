"use client"

import { SurahList } from "@/components/quran/surah-list"
import { ExternalSourceNotice } from "@/components/shared/external-source-notice"
import { useTranslation } from "@/hooks/use-translation"

export default function QuranPage() {
  const { t } = useTranslation()

  return (
    <section className="space-y-4 py-4">
      <div>
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          {t("quran.title")}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          114 {t("quran.surahsCount")} · {t("quran.readOnPrefix")} Quran.com
        </p>
      </div>

      <SurahList />

      <ExternalSourceNotice sourceName="quran.com" />
    </section>
  )
}