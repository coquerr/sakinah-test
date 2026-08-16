import { DayHeader } from "@/components/shared/day-header"
import { PrayerTimesCard } from "@/components/prayer/prayer-times-card"
import { PrayerList } from "@/components/prayer/prayer-list"

export default function HomePage() {
  return (
    <section className="py-4">
      <DayHeader />
      <PrayerTimesCard />
      <PrayerList />
    </section>
  )
}