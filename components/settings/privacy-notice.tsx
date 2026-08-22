"use client"

import { ShieldCheck } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export function PrivacyNotice() {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <ShieldCheck size={18} className="text-primary" />
      </span>
      <div>
        <p className="text-sm font-medium text-foreground">{t("profile.privacyTitle")}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{t("profile.privacyText")}</p>
      </div>
    </div>
  )
}