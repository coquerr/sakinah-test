"use client"

import { ArrowUpRight } from "lucide-react"
import { AzkarHubLink } from "@/components/azkar/azkar-hub-link"
import { AzkarList } from "@/components/azkar/azkar-list"
import { useTranslation } from "@/hooks/use-translation"

export default function AzkarPage() {
  const { t } = useTranslation()

  return (
    <section className="space-y-3 py-4">
      <div className="mb-1">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          {t("azkar.title")}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{t("azkar.subtitle")}</p>
        <a
          href="https://sunnah.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          {t("azkar.sourceNotice")}
          <ArrowUpRight size={12} />
        </a>
      </div>

      <AzkarHubLink />
      <AzkarList />
    </section>
  )
}