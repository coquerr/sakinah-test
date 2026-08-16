import { Home, BookOpen, Sparkles, Compass, User } from "lucide-react"
import { NavItem } from "@/types/nav"

export const navItems: NavItem[] = [
  { href: "/", labelKey: "nav.home", icon: Home },
  { href: "/quran", labelKey: "nav.quran", icon: BookOpen },
  { href: "/azkar", labelKey: "nav.azkar", icon: Sparkles },
  { href: "/qibla", labelKey: "nav.qibla", icon: Compass },
  { href: "/profile", labelKey: "nav.profile", icon: User }
]