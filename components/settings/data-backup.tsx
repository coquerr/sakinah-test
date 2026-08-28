"use client"

import { useRef } from "react"
import { Download, Upload, Database } from "lucide-react"
import { get, set } from "idb-keyval"

// Список всех ключей Zustand store, которые мы перенесли в IndexedDB
const STORE_KEYS = [
  "sakinah-tracker",
  "sakinah-settings",
  "sakinah-onboarding",
  "sakinah-quran-recent",
  "sakinah-privacy-notice",
  "sakinah-azkar-favorites"
]

export function DataBackup() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExport = async () => {
    try {
      const data: Record<string, any> = {}
      for (const key of STORE_KEYS) {
        const val = await get(key)
        if (val) data[key] = val
      }
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `sakinah-backup-${new Date().toISOString().split('T')[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Ошибка при экспорте:", error)
    }
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const result = e.target?.result
        if (typeof result !== "string") return
        
        const data = JSON.parse(result)
        
        for (const key of STORE_KEYS) {
          if (data[key] !== undefined) {
            await set(key, data[key])
          }
        }
        
        alert("Данные успешно восстановлены! Приложение будет перезагружено.")
        window.location.reload()
      } catch (error) {
        alert("Ошибка при чтении файла резервной копии. Проверьте формат.")
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-surface p-5 shadow-card">
      <div className="flex items-center gap-2 mb-3">
        <Database size={16} className="text-primary" />
        <span className="text-sm font-medium text-foreground">
          Резервное копирование
        </span>
      </div>
      
      <p className="mb-4 text-xs text-muted-foreground">
        Сохраните статистику намазов и настройки, чтобы не потерять их при смене телефона или очистке кэша браузера.
      </p>

      <div className="flex gap-3">
        <button
          onClick={handleExport}
          className="flex flex-1 items-center justify-center rounded-xl bg-primary/10 px-4 py-2.5 text-xs font-semibold text-primary transition-all hover:bg-primary/20 active:scale-95"
        >
          <Download size={14} className="mr-1.5" />
          Экспорт
        </button>
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-1 items-center justify-center rounded-xl border border-border/60 bg-surface-hover px-4 py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-border/60 active:scale-95"
        >
          <Upload size={14} className="mr-1.5" />
          Импорт
        </button>
        
        <input
          type="file"
          accept=".json"
          ref={fileInputRef}
          onChange={handleImport}
          className="hidden"
        />
      </div>
    </div>
  )
}