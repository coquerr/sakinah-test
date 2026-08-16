export interface SettingsRow {
  user_id: string
  calculation_method: string
  latitude: number | null
  longitude: number | null
  location_label: string | null
  language: string
  updated_at: string
}

export interface TrackerRow {
  user_id: string
  date: string
  statuses: Record<string, string>
  updated_at: string
}