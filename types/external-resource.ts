import { LucideIcon } from "lucide-react"

export interface ExternalResourceCategory {
  id: string
  title: string
  description: string
  href: string
  icon: LucideIcon
  tone?: "primary" | "accent"
}