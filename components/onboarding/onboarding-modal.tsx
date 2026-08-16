"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MoonStar, Compass, BookOpen, Sparkles } from "lucide-react"
import { useOnboardingStore } from "@/store/onboarding-store"
import { useTranslation } from "@/hooks/use-translation"
import { TranslationKey } from "@/lib/i18n"

const slideIcons = [MoonStar, Compass, BookOpen, Sparkles]

const slideKeys: { titleKey: TranslationKey; textKey: TranslationKey }[] = [
  { titleKey: "onboarding.slide1Title", textKey: "onboarding.slide1Text" },
  { titleKey: "onboarding.slide2Title", textKey: "onboarding.slide2Text" },
  { titleKey: "onboarding.slide3Title", textKey: "onboarding.slide3Text" },
  { titleKey: "onboarding.slide4Title", textKey: "onboarding.slide4Text" }
]

export function OnboardingModal() {
  const hasSeenOnboarding = useOnboardingStore((state) => state.hasSeenOnboarding)
  const completeOnboarding = useOnboardingStore((state) => state.completeOnboarding)
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || hasSeenOnboarding) return null

  const isLast = step === slideKeys.length - 1
  const current = slideKeys[step]
  const Icon = slideIcons[step]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8 text-center"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Icon size={26} className="text-primary" />
              </div>
              <p className="mt-5 text-lg font-semibold text-foreground">{t(current.titleKey)}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(current.textKey)}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-1.5">
            {slideKeys.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === step ? "w-5 bg-primary" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => (isLast ? completeOnboarding() : setStep((prev) => prev + 1))}
            className="mt-8 w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity active:opacity-80"
          >
            {isLast ? t("onboarding.start") : t("onboarding.next")}
          </button>

          {!isLast && (
            <button
              onClick={completeOnboarding}
              className="mt-3 w-full text-xs text-muted-foreground"
            >
              {t("onboarding.skip")}
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}