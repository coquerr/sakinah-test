import { MoonStar, Sunrise, Sun, CloudSun, Sunset, Moon, LucideIcon } from "lucide-react"

export const prayerIcons: Record<string, LucideIcon> = {
  fajr: MoonStar,
  sunrise: Sunrise,
  dhuhr: Sun,
  asr: CloudSun,
  maghrib: Sunset,
  isha: Moon
}