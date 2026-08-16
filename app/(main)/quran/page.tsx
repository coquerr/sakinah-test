import { SurahList } from "@/components/quran/surah-list"
import { ExternalSourceNotice } from "@/components/shared/external-source-notice"

export default function QuranPage() {
  return (
    <section className="space-y-4 py-4">
      <div>
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">Коран</h2>
        <p className="mt-1 text-sm text-muted-foreground">114 сур</p>
      </div>

      <SurahList />

      <ExternalSourceNotice sourceName="quran.com" />
    </section>
  )
}