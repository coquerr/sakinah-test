"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, LogOut, CheckCircle2, RefreshCw } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useSupabaseUser } from "@/hooks/use-supabase-user"
import { useTranslation } from "@/hooks/use-translation"

export function AccountSection() {
  const { user, loading } = useSupabaseUser()
  const { t } = useTranslation()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const handleSendLink = async () => {
    if (!email.trim()) return

    setStatus("sending")
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })

    setStatus(error ? "error" : "sent")
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="flex h-[88px] items-center justify-center rounded-2xl border border-border/60 bg-surface shadow-card">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (user) {
    return (
      <div className="rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-foreground">{t("account.title")}</span>
            <p className="mt-1 text-xs text-muted-foreground">{user.email}</p>
            <div className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
              <RefreshCw size={11} />
              <span>{t("account.synced")}</span>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:bg-surface-hover"
            aria-label={t("account.signOut")}
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
      <span className="text-sm font-medium text-foreground">{t("account.title")}</span>
      <p className="mt-1 text-xs text-muted-foreground">{t("account.subtitle")}</p>

      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary"
          >
            <CheckCircle2 size={16} />
            <span>{t("account.linkSent")}</span>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="relative mt-3">
              <Mail
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t("account.emailPlaceholder")}
                className="w-full rounded-xl border border-border/60 bg-background py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
            <button
              onClick={handleSendLink}
              disabled={status === "sending"}
              className="mt-3 w-full rounded-full bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-opacity active:opacity-80 disabled:opacity-50"
            >
              {status === "sending" ? t("account.sending") : t("account.sendLink")}
            </button>
            {status === "error" && (
              <p className="mt-2 text-xs text-red-500">{t("account.error")}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}