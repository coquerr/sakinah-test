"use client"

import { motion } from "framer-motion"

interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
}

export function ProgressRing({ progress, size = 220, strokeWidth = 7 }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <svg width={size} height={size} className="-rotate-90 overflow-visible">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius - strokeWidth * 1.6}
        className="fill-primary/[0.04]"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        className="stroke-border-subtle"
        fill="none"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className="stroke-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.35)]"
        fill="none"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: circumference * (1 - progress) }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </svg>
  )
}