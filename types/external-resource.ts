import { LucideIcon } from "lucide-react"

export type ExternalResourceGroup = "daily" | "everyday" | "special"

export interface ExternalResourceCategory {
  id: string
  title: string
  description: string
  href: string
  icon: LucideIcon
  tone?: "primary" | "accent"
  group?: ExternalResourceGroup
}