import { QuickLinks } from "@/components/settings/quick-links"
import { CitySearch } from "@/components/settings/city-search"
import { LanguageSelector } from "@/components/settings/language-selector"
import { AppearanceSelector } from "@/components/settings/appearance-selector"
import { PrivacyNotice } from "@/components/settings/privacy-notice"
import { PrayerTracker } from "@/components/prayer/prayer-tracker"
import { ProfileSummaryCard } from "@/components/profile/profile-summary-card"
import { StreakBadge } from "@/components/profile/streak-badge"
import { SectionLabel } from "@/components/settings/section-label"
import { RegionSelector } from "@/components/profile/region-selector"
import { DataBackup } from "@/components/settings/data-backup"

export default function ProfilePage() {
  return (
    <section className="space-y-6 py-4">
      <div className="space-y-3">
        <ProfileSummaryCard />
        <StreakBadge />
      </div>

      <PrayerTracker />

      <div>
        <SectionLabel labelKey="profile.quickLinksLabel" />
        <QuickLinks />
      </div>

      <div className="space-y-2">
        <SectionLabel labelKey="profile.settingsLabel" />
        <CitySearch />
        <RegionSelector />
        <DataBackup />
        <LanguageSelector />
        <AppearanceSelector />
        <PrivacyNotice />
      </div>
    </section>
  )
}