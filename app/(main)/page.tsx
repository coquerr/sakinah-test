import { DayHeader } from "@/components/shared/day-header"
import { HijriDateCard } from "@/components/shared/hijri-date-card"
import { PrayerTimesCard } from "@/components/prayer/prayer-times-card"
import { QuickActions } from "@/components/prayer/quick-actions"
import { PrayerList } from "@/components/prayer/prayer-list"

export default function HomePage() {
  return (
    <section className="py-4">
      <DayHeader />
      <HijriDateCard />
      <PrayerTimesCard />
      <QuickActions />
      <PrayerList />
    </section>
  )
}