import { AzkarHubLink } from "@/components/azkar/azkar-hub-link"
import { AzkarList } from "@/components/azkar/azkar-list"
import { ExternalSourceNotice } from "@/components/shared/external-source-notice"

export default function AzkarPage() {
  return (
    <section className="space-y-3 py-4">
      <div className="mb-1">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
          Азкары и дуа
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Выберите категорию поминаний</p>
      </div>

      <AzkarHubLink />
      <AzkarList />

      <ExternalSourceNotice sourceName="sunnah.com" />
    </section>
  )
}