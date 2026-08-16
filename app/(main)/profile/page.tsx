import { AccountSection } from "@/components/settings/account-section"
import { QuickLinks } from "@/components/settings/quick-links"
import { CitySearch } from "@/components/settings/city-search"
import { LanguageSelector } from "@/components/settings/language-selector"
import { PrayerTracker } from "@/components/prayer/prayer-tracker"
import { SectionLabel } from "@/components/settings/section-label"

export default function ProfilePage() {
  return (
    <section className="space-y-6 py-4">
      <PrayerTracker />

      <AccountSection />

      <div>
        <SectionLabel labelKey="profile.quickLinksLabel" />
        <QuickLinks />
      </div>

      <div className="space-y-2">
        <SectionLabel labelKey="profile.settingsLabel" />
        <CitySearch />
        <LanguageSelector />
      </div>
    </section>
  )
}