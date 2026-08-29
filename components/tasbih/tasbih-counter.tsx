"use client"

import { motion } from "framer-motion"
import { RotateCcw } from "lucide-react"
import { useTasbihStore } from "@/store/tasbih-store"

export function TasbihCounter() {
  const { count, goal, increment, reset } = useTasbihStore()

  const progress = Math.min(((count % goal === 0 && count > 0 ? goal : count % goal) / goal) * 100, 100)
  const isGoalReached = (count + 1) % goal === 0

  const handleTap = () => {
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(isGoalReached ? [50, 100, 50] : 30)
    }
    increment()
  }

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation()
    reset()
  }

  return (
    <div className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-border/60 bg-surface p-6 shadow-card">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 bg-glow-primary" />

      <div className="relative z-10 mb-8 flex w-full items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">Электронный Тасбих</span>
          <span className="text-xs text-muted-foreground">Круг: {goal}</span>
        </div>
        <button
          onClick={handleReset}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-hover text-muted-foreground transition-colors hover:text-foreground active:scale-95"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={handleTap}
        className="relative z-10 flex h-60 w-60 items-center justify-center rounded-full outline-none"
      >
        <div className="absolute inset-0 rounded-full border border-border/60" />
        <div className="absolute inset-4 rounded-full border border-dashed border-border-subtle" />

        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="text-primary"
            initial={{ strokeDasharray: "0 300" }}
            animate={{ strokeDasharray: `${(progress / 100) * 289} 300` }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
          />
        </svg>

        <span className="font-heading text-6xl font-semibold tabular-nums text-foreground">
          {count}
        </span>
      </motion.button>
      
      <p className="relative z-10 mt-8 text-xs text-muted-foreground">
        Нажмите на круг для счета
      </p>
    </div>
  )
}