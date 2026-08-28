"use client"

import { useEffect, useState } from "react"
import { RefreshCw } from "lucide-react"

export function PwaUpdater() {
  const [showUpdate, setShowUpdate] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return
    }

    navigator.serviceWorker.getRegistration().then((reg) => {
      if (!reg) return

      // Отлавливаем установку нового воркера
      reg.addEventListener("updatefound", () => {
        const newWorker = reg.installing
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              setWaitingWorker(newWorker)
              setShowUpdate(true)
            }
          })
        }
      })

      // Если новый воркер уже ждет в фоне
      if (reg.waiting) {
        setWaitingWorker(reg.waiting)
        setShowUpdate(true)
      }
    })

    // Перезагружаем страницу, как только новый воркер берет контроль
    let refreshing = false
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!refreshing) {
        refreshing = true
        window.location.reload()
      }
    })
  }, [])

  const reloadPage = () => {
    if (waitingWorker) {
      // Даем команду воркеру пропустить ожидание и применить кэш
      waitingWorker.postMessage({ type: "SKIP_WAITING" })
    }
    setShowUpdate(false)
  }

  if (!showUpdate) return null

  return (
    <div className="fixed bottom-24 left-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 overflow-hidden rounded-2xl border border-primary/20 bg-surface/95 p-4 shadow-card backdrop-blur-md">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">Доступно обновление</span>
          <span className="text-[11px] text-muted-foreground">Нажмите, чтобы применить</span>
        </div>
        <button
          onClick={reloadPage}
          className="flex items-center justify-center rounded-xl bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary/20 active:scale-95"
        >
          <RefreshCw size={14} className="mr-1.5" />
          Обновить
        </button>
      </div>
    </div>
  )
}